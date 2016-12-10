module.exports = function(app){

  var listaProdutos = function(req,res){
    var connection = app.infra.connectionFactory();
    var ProdutosDAO = new app.infra.ProdutosDAO(connection);

    ProdutosDAO.lista(function(erros,resultados){
      res.render('produtos/lista',{lista:resultados});
    });
    connection.end();
  }

  app.get('/produtos', listaProdutos);

  app.get('/produtos/form',function(req,res){
    res.render('produtos/form');
  });
  app.post('/produtos',function(req,res){
    var livro = req.body;
    var connection = app.infra.connectionFactory();
    var ProdutosDAO = new app.infra.ProdutosDAO(connection);
    ProdutosDAO.salva(livro,function(erros,resultados){
      res.redirect('/produtos');
    });
  });
}
