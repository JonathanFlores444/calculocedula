const express = require('express');
const https = require('https');
const app = express();

app.get('/calcular',(req,res)=>{
    var cedula=(req.query.c);
    var ultimoDigito = parseInt(cedula.substring(9,10));
    if(cedula.length == 10){
        var sumaImpar = 0;
        for (var i = 0; i < 9; i = i + 2) { 
            var numero = parseInt(cedula.substring(i, i + 1));
            numero = (numero * 2);
            if (numero > 9) {
                numero = (numero - 9);
            }
            sumaImpar = sumaImpar + numero; 
        }
        var sumaPar = parseInt(cedula.substring(1,2)) + 
                        parseInt(cedula.substring(3,4)) + 
                        parseInt(cedula.substring(5,6)) + 
                        parseInt(cedula.substring(7,8));

        var modulo = (sumaImpar + sumaPar) % 10;
        if(modulo == 0){
            res.json("Esta es una cedula ecuatoriana")
        }else{
            var verificar = 10 - modulo;
            if(verificar == ultimoDigito){res.json("Esta es una cedula ecuatoriana")}
            else{res.json("Esta no es una cedula ecuatoriana")}
        }
        
    }else {
        res.json("La cedula debe tener 10 digitos");
    }
});

app.listen(3000, function(){
    console.log("Servicio corriending en el servidorts...");
});