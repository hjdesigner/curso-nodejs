module.exports = function(app){

  var listaProdutos = function(req,res){
    var connection = app.infra.connectionFactory();
    var ProdutosDAO = new app.infra.ProdutosDAO(connection);

    ProdutosDAO.lista(function(erros,resultados){
      res.format({
        html: function(){
          res.render('produtos/lista',{lista:resultados});
        },
        json: function(){
          res.json(resultados);
        }
      });
    });
    connection.end();
  }

  app.get('/produtos', listaProdutos);

  app.get('/produtos/form',function(req,res){
    res.render('produtos/form');
  });
  app.post('/produtos',function(req,res){
    var livro = req.body;
    console.log(livro)
    var connection = app.infra.connectionFactory();
    var ProdutosDAO = new app.infra.ProdutosDAO(connection);
    ProdutosDAO.salva(livro,function(erros,resultados){
      console.log(erros);
      res.redirect('/produtos');
    });
  });
}
