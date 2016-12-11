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
    res.render('produtos/form',{errosValidacao:{},livro:{}});
  });
  app.post('/produtos',function(req,res){
    var livro = req.body;

    req.assert('titulo','Titulo é obrigatório').notEmpty();
    req.assert('preco','Formato inválido').isFloat();

    var erros = req.validationErrors();
    if(erros){
        res.format({
          html: function(){
            res.status(400).render('produtos/form',{errosValidacao:erros,livro:livro});
          },
          json: function(){
            res.status(400).json(erros);
          }
        });
        return;
    }

    var connection = app.infra.connectionFactory();
    var ProdutosDAO = new app.infra.ProdutosDAO(connection);
    ProdutosDAO.salva(livro,function(erros,resultados){
      res.redirect('/produtos');
    });
  });
}
