exports = {
  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onTicketCreateHandler: function (args) {

    var unirest = require('unirest');
    var html_to_pdf = require('html-pdf-node');
    var fs = require('fs-jetpack');
    
   // console.log('Oi ' + args['data']['requester']['name']);

    var html1 = "<html>" +
      "<head></head>" +
      "<body style=\"font-size:10px\">" +
      "<div class = 'container'>" +
      "<h2 align='center'>Termo de Responsabilidade</h2>" +
      "<br>" +
      "<p>Eu, " + args['data']['requester']['name'] + ", conforme matrícula " + args['data']['requester']['id'] + ", declaro para os fins que se fizerem necessários que recebi da empresa LATICINIOS BELA VISTA LTDA., um aparelho de telefone tipo celular " + args['data']['requester']['mobile'] + ", com os seguintes números de registro:</p>" +
      "<br>" +
      "<table border='1'>" +
      "<tr>" +
      "<th>Modelo:</th>" +
      "<th>Nº da linha:</th>" +
      "<th>Nº do Chip:</th>" +
      "<th>IMEI:</th>" +
      "<th>Tag do Ativo:</th>" +
      "<th>Código do Imobilizado:</th>" +
      "</tr>" +
      "<tr>" +
      "<td align='center'>123</td>" +
      "<td align='center'>456</td>" +
      "<td align='center'>789</td>" +
      "<td align='center'>987</td>" +
      "<td align='center'>654</td>" +
      "<td align='center'>0001</td>" +

      "</tr>" +
      "</table>" +
      "<br>" +
      "<p><strong>Condições para utilização do aparelho corporativo:</strong><p>" +
      "<ol type=\"a\">" +
      "<li>Declara ter recebido o aparelho em perfeito estado de conservação e funcionamento, juntamente com os acessórios (bateria, carregador, fone de ouvido e manual de instrução) assim como todas as orientações de manuseio, utilização e conservação;</li>" +
      "<li>Está ciente que o equipamento servirá para uso exclusivo profissional/comercial, sendo vedado o seu uso para outros fins, possui somente a DETENÇÃO e NÃO a PROPRIEDADE do equipamento, sendo vedado o empréstimo, aluguel ou cessão deste a terceiro;</li>" +
      "<li>Compromete-se a devolver o equipamento quando for solicitado ou ao término do contrato individual do trabalho, no mesmo dia em que for comunicado ou comunique seu desligamento, em perfeito estado considerando o desgaste natural pelo uso normal do equipamento;</li>" +
      "<li>Estou ciente de que a empresa terá o controle de todas as ligações efetuadas e caso haja uso para fins particulares e/ou mau uso, as mesmas serão de minha inteira responsabilidade, ficando a empresa autorizada a efetuar o desconto do respectivo valor em meu pagamento salarial;</li>" +
      "<li>Na hipótese de danos causados por conduta dolosa ou culposa motivada pelo uso indevido do aparelho e/ou acessórios, ficará obrigado a ressarcir à empresa o valor do aparelho, que consta na nota fiscal, entregue junto com aparelho ou substituí-lo por outro de igual modelo e valor. Pelo que desde já fica o empregador, autorizado a efetivar o desconto da importância correspondente ao prejuízo do pagamento salarial;</li>" +
      "<li>Em caso de perda, roubo, furto, o empregado deverá solicitar de imediato o bloqueio da linha ligando para (62) 3946-8290/(62) 3946-8291 evitando consumo indesejado e solicitar a reposição do aparelho ao departamento de tecnologia de informação (TI). Para esses casos, é obrigatória a apresentação de Boletim de Ocorrência;</li>" +
      "<li>Caso o aparelho venha a apresentar defeitos não motivados por uso indevido no prazo de noventa (90) dias, contados a partir da entrega do aparelho, será de responsabilidade da empresa a substituição do aparelho sem quaisquer ônus para o colaborador;</li>" +
      "<li>Qualquer problema ou dúvida, deverá entrar em contato diretamente com o departamento de tecnologia de informação (TI). Em relação à utilização de assistência técnica esta somente será acionada pelo departamento de tecnologia de informação (TI).</li>" +
      "<li><strong>PARA LIGAÇÕES COM DDD DIFERENTE DA LINHA DO TELEFONE UTILIZAR A OPERADORA COM CÓDIGO \"15\". Ex.: 01562....</strong></li>" +
      "</ol>" +
      "<br>" +
      "<p>Por ser a expressão da verdade, firmo o presente.</p>" +
      "<br>" +
      "<p>Goiânia  GO, VAI </p>" +
      "</div>" +
      "</body>" +
      "</html>";



    let options = { format: 'A4', path: "pdf2.pdf" };
    // Example of options with args //
    // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

    let file = { content: html1 };
    // or //
    //let file = { url: "https://example.com" };



    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
      console.log("PDF Buffer:-", pdfBuffer);
    });


    // function sendData(pdfBuffer) {

    //var fs = require('fs');


    // var API_KEY = "PwouxCLBX3lLIl8kB1Z";      
    var FD_ENDPOINT = "piracanjuba-fs-sandbox";
    //var FD_ENDPOINT = "piracanjuba";

    // var PATH = "/api/v2/tickets";
   //var PATH = "/api/v2/service_catalog/items/221/place_request";
     var PATH = "/api/v2/tickets/" + args['data']['ticket']['id'];
    // var enocoding_method = "base64";
    // var auth = "Basic " + new Buffer(API_KEY + ":" + 'X').toString(enocoding_method);
    var URL = "https://" + FD_ENDPOINT + ".freshservice.com" + PATH;
    var myFiles = []
    myFiles.push(fs.createReadStream('./pdf1.pdf'));

    var fields = {
      // 'quantity': 1,
      // 'email': "henrique.silva@piracanjuba.com.br",
      'attachments[]': "123"
      // 'custom_fields' : {
      //   "uf" : "SP"
      // }
    }
    console.log(URL);

    var headers = {
      // 'Content-Type': 'a',
      // 'Content-Type': "multipart/form-data", //"application/json",
      // 'Authorization' : "UHdvdXhDTEJYM2xMSWw4a0IxWjoq" //auth //'Basic UHdvdXhDTEJYM2xMSWw4a0IxWjpY'
      'Authorization': 'Basic UHdvdXhDTEJYM2xMSWw4a0IxWjoq'//,
      // 'Content-Length' : '*'
    }
    //console.log(pdfBuffer);
    console.log(fields);

    //C:\Users\hsilv\FreshServiceApp1\pdf1.pdf
    var a = fs.createReadStream('./pdf1.pdf');
    console.log("PDF STREAM: " + a);

    unirest.put(URL)
      .headers(headers)
      //.field(fields)
      .field('attachments[]', fs.createReadStream('./pdf1.pdf'))
      //.attach('attachments[]', fs.createReadStream('C:\Users\hsilv\FreshServiceApp1\pdf1.pdf'))
      //.attach('attachments[]', pdfBuffer1)
      //.attach('attachments[]', myFiles)
      //  .attach('attachments[]', fs.createReadStream('\path\to\file2.ext'), "pdf1.pdf")
      .end(function (response) {
        // console.log(response.body)
        console.log("Response Status : " + response.status)
        //console.log(response.headers)
        if (response.status == 201) {
          console.log("Location Header : " + response.headers['location'])
        }
        else {
          //console.log("X-Request-Id :" + response.headers['x-request-id']);

          console.log(response.body);
        }
      });


    // unirest.get("https://piracanjuba-fs-sandbox.freshservice.com/api/v2/tickets/56")
    // .headers(headers)
    // .end(function (response) {
    //   console.log("TICKET - - " + response.status);
    //   console.log(JSON.stringify(response.body))
    // })
  }


  // }
}
