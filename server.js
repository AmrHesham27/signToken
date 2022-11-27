const express = require('express');
const cors = require('cors')
const app = express()

app.use(cors());

app.get('/getCerts', (req, res) => {
    try {
        SignerDemtra.getCerts({ action: "getCerts" }).then(function (res) {
            var r = JSON.parse(res.result);
            if (res.isValid) {
                res.status(200).send({apiStatus: true, data: r.Tokens})
            } else {
                throw Error('res is not valid')
            }
        })
    }
    catch (e) {
        res.status(500).send({apiStatus: true, data: e})
    }
        
})

app.post('/signDocument', (req, res) => {
    try {
        SignerDemtra.signJson({ 
            action: "Sign", 
            tokenSerial: req.body.tokenSerial, 
            tokenPin: req.body.tokenPin, 
            originalDocument: req.body.originalDocument 
        }).then(function (res) {
            var r = JSON.parse(res.result);
            if (res.isValid) {
                var sD = JSON.parse(r.DocumentToSend);    
                res.status(200).send({apiStatus: true, data: sD.documents[0].signatures[0].value})
            } 
            else throw Error('res is not valid')
        }
        );
    }
    catch (e) {
        res.status(500).send({apiStatus: false, data: e})
    }  
})

app.listen(3000, () => {
    console.log(`your server is listening`)
})