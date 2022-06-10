const URL = 'https://tiagoifsp.ddns.net/clinicaMedica/'
const MEDICOS = 'medicos.php'
const PACIENTES = 'pacientes.php'
const CONSULTAS = 'consultas.php'
const ESPECIALIDADES = 'especialidades.php'

// paciente: nome e data de nasc.
//médico: nome, data de cadastro e especialização (somente uma por médico)

/*As rotas disponíveis são:
pacientes.php suporta as seguintes operações:

GET - Retorna a lista de pacientes.
POST - Adiciona um novo paciente. Requer parâmetros nome e dataNascimento (no formato YYYY-MM-DD).
PUT - Edita um paciente. Requer parâmetros id, nome e dataNascimento (no formato YYYY-MM-DD).
DELETE - Remove um paciente. Requer parâmetro id (do tipo GET).
medicos.php suporta as seguintes operações:

GET - Retorna a lista de médicos.
POST - Adiciona um novo médico. Requer parâmetros nome e idEspecialidade.
PUT - Edita um médico. Requer parâmetros id, nome e idEspecialidade.
DELETE - Remove um médico. Requer parâmetro id (do tipo GET).
consultas.php suporta as seguintes operações:

GET - Retorna a lista de consultas.
POST - Adiciona uma nova consulta. Requer parâmetros idPaciente e idMedico e data (no formato YYYY-MM-DD HH:mm).
PUT - Edita uma consulta. Requer parâmetros id, idPaciente e idMedico e data (no formato YYYY-MM-DD HH:mm).
DELETE - Remove uma consulta. Requer parâmetro id (do tipo GET).
especialidades.php suporta as seguintes operações:

GET - Retorna a lista de especialidades. */

$(document).ready(function () {
  //quando o DOM estiver completamente carregado, executa a função-parametro
  waitingScreen('none')
  $('.addAppointment').click((e) => {e.preventDefault() 
    createInputAppointment()})
  $('.addPatient').click((e) => {e.preventDefault() 
    createInputPatient()})
  $('.addDoctor').click((e) => {e.preventDefault() 
    createInputDoctor()})
  $('.listDoctor').click((e) => {e.preventDefault() 
    getData(URL, MEDICOS, 'table')})
  $('.listPatient').click((e) => {e.preventDefault() 
    getData(URL, PACIENTES, 'table')})
})

function clearMain() {
  // função para limpar a main antes de construir nova pagina
  $('main').empty()
}

function createInputAppointment() {
  clearMain()
  waitingScreen('show')
  getData(URL, MEDICOS, 'fill')
  getData(URL, PACIENTES, 'fill')


  let elements = {
    titulo: $('<h2>').text('Cadastrar nova consulta'),
    labelMedico: $('<label>').text('Médico').addClass('h5 form-label'),
    selectMedico: $('<select class="form-select selectmedicos">'),
    warnMedico: $('<p>').text('Médico inválido').addClass('text-danger'),
    labelPaciente: $('<label>').text('Paciente').addClass('h5 form-label'),
    selectPaciente: $('<select class=" form-select selectpacientes"></select>'),
    warnPaciente: $('<p>').text('Paciente inválido').addClass('text-danger'),
    labelData: $('<label>').text('Data da consulta').addClass('h5 form-label'),
    inputData: $('<input type="date"></input>').addClass('form-control'),
    warnData: $('<p>').text('Selecione uma data valida').addClass('text-danger'),
    labelHora: $('<label>').text('Hora da consulta').addClass('h5 form-label'),
    inputHora: $('<input type="time">').addClass('form-control'),
    warnHora: $('<p>').text('Selecione um horario valido').addClass('text-danger'),
    botaoCadastrar: $('<button>').text('Cadastrar').addClass('cadastrar btn btn-dark')
  } // um objetao com os campos da pagina
 
  form = $('<form>')
  Object.keys(elements).forEach(key => {
    //itera o objeto e da append na main
    form.append(elements[key])
  })

  $('main').append($('<div>').addClass(['col-4', 'm-auto']))
  $('.col-4').append(form)
  $('input').change(function (e) {
    className = $(this).attr('class')
    if ($(this).val() != '') {
      $('.warninglabel' + className).remove()
    }
  })
  $('.cadastrar').click(function (e) {
    e.preventDefault()
  })
}

function createInputPatient() {
  clearMain()
  $('main').append($('<div>').addClass(['col-4', 'm-auto']))
  $('.col-4').append($('<h2>').text('Cadastrar novo paciente')) 
  $('.col-4').append($('<form>'))

  $('form').append($('<label>').text('Nome').addClass('h5 form-label'))
  $('form').append(
    $('<input id="nome" type="text" placeholder="Nome">').addClass('h5 form-control')
  )
  $('form').append($('<p>').text('Digite um nome!').addClass('text-danger'))

  $('form').append($('<label>').text('Data de Nascimento').addClass('h5 form-label'))
  $('form').append($('<input id="data" type="date">').addClass('form-control'))
  $('form').append($('<p>').text('Selecione uma data de nascimento valida' ).addClass('text-danger')
  )
  $('form').append($('<button>').text('Cadastrar').addClass('cadastrar btn btn-dark'))


  $('.cadastrar').click(function (e) {
    e.preventDefault()
    data = {
      nome: $('#nome').val(),
      data: $('#data').val()
    }

    JSON = JSON.stringify(data)
    console.log(JSON)
    //postData(URL, PACIENTES, JSON)
  })
}

function createInputDoctor() {
  clearMain()
  waitingScreen('show')
  getData(URL, ESPECIALIDADES, 'fill')

  $('main').append($('<div>').addClass(['col-4', 'm-auto']))
  $('.col-4').append($('<h2>').text('Cadastrar novo médico')) 
  $('.col-4').append($('<form>'))
 
  $('form').append($('<label>').text('Nome').addClass('h5 form-label'))
  $('form').append(
    $('<input id="nome" type="text" placeholder="Nome">').addClass('form-control')
  )
  $('form').append($('<p>').text('Digite um nome!').addClass('text-danger'))
  $('form').append($('<label>').text('Especialidade').addClass('h5 form-label'))
  $('form').append(
    $('<select id=" especialidade" class=" form-select selectespecialidades">')
  )
  $('form').append($('<p>').text('Selecione uma especialidade!').addClass('text-danger'))
  $('form').append($('<button>').text('Cadastrar').addClass('cadastrar btn btn-dark mt-3'))

  $('.cadastrar').click(function (e) {
    e.preventDefault()
    data = {
      nome: $('#nome').val(),
      data: $('#especialidade').val()
    }

    JSON = JSON.stringify(data)
    console.log(JSON)
    //postData(URL, PACIENTES, JSON)
  })
}

function processResult(response, dir, action) {
  switch (action) {
    case 'fill':
      fillSelections(response, dir)
      break

    case 'table':
      createTable(response, dir)
      break

    case 'modal':
      createModal(response, dir)
    default:
      break
  }
}

function fillSelections(response, dir) {
  let field = dir.toLowerCase().split('.')[0]
  $('.select' + field).append($(' <option hidden disabled selected value></option>'))
 
  for (let index = 0; index < response.length; index++) {
    $('.select' + field).append($('<option>').text(response[index].nome))
  }
  waitingScreen('none')
}

function getData(URL, dir, action) {
  $.ajax({
    type: 'GET',
    url: URL + dir,
    data: 'data',
    dataType: 'JSON',
    success: function (response) {
      processResult(response, dir, action)
    }
  })
}

function postData(URL, dir, JSON) {
  let field = dir.toLowerCase().split('.')[0]
  $.ajax({
    type: 'POST',
    url: URL + dir,
    data: JSON,
    dataType: 'JSON',
    success: function () {
      createJalert(att, field, ' adicionado com sucesso!')
    },
    error: function () {
      createJalert(att, field, ' não adicionado!')
    }
  })
}

function createTable(response, dir) {
  clearMain()
  waitingScreen('show')
  let especialidades = {
    1: 'Cardiologista',
    2: 'Oftalmologista',
    3: 'Ortopedista',
    4: 'Oncologista',
    5: 'Cirurgia Geral',
    6: 'Anestesista',
    7: 'Psiquiatra'
  }
  let thsKeys = []
  $('main').append('<table>').addClass('table table-hover')
  $('table').append('<tr>')
  $('tr').append('<th><th><th><th colspan=3>')

  for (let index = 0; index < response.length; index++) {
    let id
    $('table').append('<tr class= "' + index + '">')
    for (let key in response[index]) {
      if (thsKeys.length < 4) {
        thsKeys.push(adjustTH(key))

      }
      if (key == 'id') {
        id = response[index][key]

        $('.' + index).addClass([id])
        $('.' + id).removeClass([index])

      } else if (key == 'idEspecialidade') {

        $('.' + id).append($('<td>').text(especialidades[response[index][key]]))
      } else {
        $('.' + id).append($('<td>').text(response[index][key]))
      }
    }
    $('.' + id).append($('<td>').append($('<button >').text('Ver consultas').addClass("btn btn-success")));
    $('.' + id).append($('<td>').append($('<button>').text('Editar').addClass("btn btn-warning")))
    $('.' + id).append($('<td>').append($('<button>').text('Deletar').addClass("btn btn-danger")))
  }
  ths = $('th')
  thsKeys.shift()
  thsKeys.push('Ações')
  for (let i=0; i<thsKeys.length; i++) {
    ths[i].innerText= thsKeys[i]
  }
  waitingScreen('none')
}


function adjustTH(key){
  switch (key) {
    case "idEspecialidade":
      return "Especialidade"      
    case "nome":
      return "Nome"      
    case "dataNascimento":
      return "Data de Nascimento"      
    case "dataNascimento":
      return "Data de Nascimento"      
    case "dataCadastro":
      return "Data de Cadastro"        
    default:
      break;
  }
}

function waitingScreen(action) {
  if (action == 'show') {
    $('#waitingScreen').removeClass('none')
    return
  }
  $('#waitingScreen').addClass('none')
}

function createJalert(att, value, msg) {
  $('#alerta').append('<div id="jAlert"> <p id="jAlert_content">')
  $('#jAlert').text(value + msg)
  $('#jAlert').addClass(att)
  setTimeout(function () {
    $('#jAlert').remove()
  }, 1000)
}
