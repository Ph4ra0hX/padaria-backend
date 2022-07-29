var express = require("express");
const { Pool, Client } = require("pg");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
var cors = require("cors");

const credentials = {
  user: "root",
  host: "localhost",
  database: "padaria",
  password: "bolinha",
  port: 5432,
};

var app = express();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

async function trazerTodosOsPedidos() {
  const pool = new Pool(credentials);
  const now = await pool.query("SELECT * from pedidos where status='novo'");
  await pool.end();

  return now.rows;
}

async function listarPedidosAtualizados() {
  const pool = new Pool(credentials);
  const now = await pool.query(
    "SELECT * from pedidos where status='imprimido'"
  );
  await pool.end();

  return now.rows;
}

async function listarPedidosCancelados() {
  const pool = new Pool(credentials);
  const now = await pool.query(
    "SELECT * from pedidos where status='cancelado'"
  );
  await pool.end();

  return now.rows;
}

async function atualizarPedidoParaImprimido(id) {
  const pool = new Pool(credentials);
  const now = await pool.query(
    `UPDATE pedidos SET status = 'imprimido' WHERE id='${id}';`
  );
  await pool.end();

  return;
}

async function atualizarpedidoparaCancelado(id) {
  const pool = new Pool(credentials);
  const now = await pool.query(
    `UPDATE pedidos SET status = 'cancelado' WHERE id='${id}';`
  );
  await pool.end();

  return;
}

async function buscarPedidoPorID(id) {
  const pool = new Pool(credentials);
  const now = await pool.query(`SELECT * from pedidos where id in ('${id}')`);
  await pool.end();

  return now.rows;
}

async function CadastrarPedido(nome, pedido, total) {
  axios
    .get("http://worldtimeapi.org/api/timezone/America/Fortaleza")
    .then(async function (response) {
      var data = response.data.datetime;

      var dataHora = data;
      dataHora = dataHora.split("T");

      var Data = dataHora[0];

      var Hora = dataHora[1].slice(0, 8);

      const pool = new Pool(credentials);
      const now = await pool.query(
        `INSERT INTO pedidos (id, nome, status,pedido,total, data) VALUES ('${uuidv4()}','${nome}','novo','${pedido}','${total}','${Data} - ${Hora}');`
      );
      await pool.end();
    });
}

//CadastrarPedido();

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get(
  "/api/enviarpedido/:pedido/:endereco/:pagamento/:observacoes/:total/:queroentrega",
  function (req, res) {
    var pedido;
    var endereco;
    var queroentrega;
    var pagamento;
    var observacoes;
    var total;

    var pedidoCompleto = "";

    pedido = JSON.parse(req.params.pedido);
    endereco = JSON.parse(req.params.endereco);
    pagamento = JSON.parse(req.params.pagamento);
    observacoes = JSON.parse(req.params.observacoes);
    total = JSON.parse(req.params.total);
    queroentrega = JSON.parse(req.params.queroentrega);

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 1) {
        pedidoCompleto += `\n\n☕ *CAFÉ:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 1) {
        pedidoCompleto += `\n   • ${pedido[x].quantidade}X ${pedido[x].nome}\n`;
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 2) {
        pedidoCompleto += `\n\n🧇 *PÃO NA CHAPA:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 2) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 3) {
        pedidoCompleto += `\n\n🫓 *CREPIOCA:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 3) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 4) {
        pedidoCompleto += `\n\n🥃 *CUSCUZ:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 4) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }
    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 5) {
        pedidoCompleto += `\n\n🍳 *OMELETE:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 5) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }
    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 6) {
        pedidoCompleto += `\n\n🥧 *SALGADINHOS:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 6) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 7) {
        pedidoCompleto += `\n\n🥪 *SANDUÍCHE:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 7) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 8) {
        pedidoCompleto += `\n\n🧃 *SUCOS:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 8) {
        pedidoCompleto += `\n   • ${pedido[x].quantidade}X ${pedido[x].nome}\n`;
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 9) {
        pedidoCompleto += `\n\n🌯 *TAPIOCA:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 9) {
        pedidoCompleto += `\n   • ${pedido[x].nome}\n`;

        console.log(pedido[x].selecionados.length);

        for (var y = 0; y < pedido[x].selecionados.length; y++) {
          pedidoCompleto += `\n     - ${pedido[x].selecionados[y].nome}\n`;
        }
      }
    }

    //--------------------------------------------

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 10) {
        pedidoCompleto += `\n\n🥤 *VITAMINAS:*\n`;
        break;
      }
    }

    for (var x = 0; x < pedido.length; x++) {
      if (pedido[x].id == 10) {
        pedidoCompleto += `\n   • ${pedido[x].quantidade}X ${pedido[x].nome}\n`;
      }
    }

    pedidoCompleto += `\n------------------\n`;

    if (queroentrega == true) {
      pedidoCompleto += `\n  Nome:  \n`;
      pedidoCompleto += `\n   • ${endereco.nome} \n`;

      pedidoCompleto += `\n  Rua:  \n`;
      pedidoCompleto += `\n   • ${endereco.rua} \n`;

      pedidoCompleto += `\n  Bairro:  \n`;
      pedidoCompleto += `\n   • ${endereco.bairro} \n`;

      pedidoCompleto += `\n  Número:  \n`;
      pedidoCompleto += `\n   • ${endereco.numero} \n`;

      pedidoCompleto += `\n  Ponto de Referência:  \n`;
      pedidoCompleto += `\n   • ${endereco.pontoderef} \n`;
    } else {
      pedidoCompleto += `\n  Nome:  \n`;
      pedidoCompleto += `\n   • ${endereco.nome2} \n`;
    }

    pedidoCompleto += `\n------------------\n`;

    pedidoCompleto += `\n  *Total: ${total.toFixed(2)}*\n`;

    pedidoCompleto += `\n  Pagamento: ${pagamento}\n`;

    pedidoCompleto += `\n------------------\n`;

    pedidoCompleto += `\n  Observação: ${observacoes}\n`;

    //--------------------------------------------

    console.log(pedidoCompleto);

    if (queroentrega == true) {
      CadastrarPedido(endereco.nome, pedidoCompleto, total.toFixed(2)).then(
        () => {
          //res.redirect(
          //  "https://api.whatsapp.com/send?1=pt_BR&phone=558897542121&text=" +
          //    pedidoCompleto
          //);
        }
      );
    } else {
      CadastrarPedido(endereco.nome2, pedidoCompleto, total.toFixed(2)).then(
        () => {
          //res.redirect(
          //  "https://api.whatsapp.com/send?1=pt_BR&phone=558897542121&text=" +
          //    pedidoCompleto
          //);
        }
      );
    }
  }
);

app.get("/api/atualizarpedidoparaimprimido/:id", function (req, res) {
  var id = req.params.id;
  atualizarPedidoParaImprimido(id).then(() => {
    res.json("ok");
  });
});

app.get("/api/atualizarpedidoparaCancelado/:id", function (req, res) {
  var id = req.params.id;
  atualizarpedidoparaCancelado(id).then(() => {
    res.json("ok");
  });
});

app.get("/api/", function (req, res) {
  trazerTodosOsPedidos().then((pedidos) => {
    res.json(pedidos);
  });
});

app.get("/api/imprimidos/", function (req, res) {
  //var id = req.params.id;
  listarPedidosAtualizados().then((pedidos) => {
    res.json(pedidos);
  });
});

app.get("/api/cancelados/", function (req, res) {
  //var id = req.params.id;
  listarPedidosCancelados().then((pedidos) => {
    res.json(pedidos);
  });
});

app.get("/api/:id", function (req, res) {
  var id = req.params.id;
  buscarPedidoPorID(id).then((pedidos) => {
    res.json(pedidos);
  });
});

app.listen(3002, function (err) {
  console.log("Servidor rodando");
});
