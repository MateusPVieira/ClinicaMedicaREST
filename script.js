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
  $('.addAppointment').click(() => createInputAppointment())
  $('.addPatient').click(() => createInputPatient())
  $('.addDoctor').click(() => createInputDoctor())
  $('.listDoctor').click(() => getData(URL, MEDICOS, 'table'))
  $('.listPatient').click(() => getData(URL, PACIENTES, 'table'))
})

function clearMain() {
  // função para limpar a main antes de construir nova pagina
  $('main').empty()
}

function createInputAppointment() {
  clearMain()
  waitingScreen('show')
  getData(URL, MEDICOS, "fill")
  getData(URL, PACIENTES, "fill")

  let elements = {
    titulo: $('<h2>').text('Cadastrar nova consulta'),
    labelMedico: $('<label class="Medicos">').text('Médico'),
    selectMedico: $('<select class="selectmedicos">'),
    warnMedico: $('<p class="warninglabel">').text('Médico inválido'),
    labelPaciente: $('<label class="paciente">').text('Paciente'),
    selectPaciente: $('<select class="selectpacientes"></select>'),
    warnPaciente: $('<p class="warninglabel">').text('Paciente inválido'),
    labelData: $('<label class="agendardata">Data da consulta</label>').text(
      'Data da consulta'
    ),
    inputData: $('<input type="date" class="inputdata"></input>'),
    warnData: $('<p class="warninglabel">').text('Selecione uma data valida'),
    labelHora: $('<label class="agendarhora">').text('Hora da consulta'),
    inputHora: $('<input type="time" class="inputtime">'),
    warnHora: $('<p class="warninglabel">').text('Selecione um horario valido'),
    botaoCadastrar: $('<button class="cadastrar">').text('Cadastrar')
  } // um objetao com os campos da pagina
  form = $('<form>')
  Object.keys(elements).forEach(key => {
    //itera o objeto e da append na main
    form.append(elements[key])
  })
  $('main').append(form)

  $('.cadastrar').click(function (e) {
    e.preventDefault()
  })
}

function createInputPatient() {
  clearMain()
  $('main').append($('<form>'))
  $('form').append($('<label class="label">').text('Nome'))
  $('form').append(
    $('<input id="nome" type="text" placeholder="Nome">')
  )
  $('form').append($('<p class="warninglabel">').text('Digite um nome!'))

  $('form').append($('<label class="label">').text('Data de Nascimento'))
  $('form').append($('<input id="data" class="label" type="date">'))
  $('form').append($('<p class="warninglabel">').text('Selecione uma data de nascimento valida'))
  $('form').append($('<button class="cadastrar">').text('Cadastrar'))

  $('.cadastrar').click(function (e) {
    e.preventDefault()
    data = {
      nome: $('#nome').val(),
      data: $('#data').val()
    }
  $('#data').bind('change',(e)=>{
    console.log('lul')
    console.log(e)
  })
    JSON = JSON.stringify(data)
    console.log(JSON)
    //postData(URL, PACIENTES, JSON)
  })
}

function createInputDoctor() {
  clearMain()
  waitingScreen('show')
  getData(URL, ESPECIALIDADES, "fill")

  $('main').append($('<form>'))
  $('form').append($('<label class="label">').text('Nome'))
  $('form').append(
    $('<input id="nome" class="label" type="text" placeholder="Nome">')
  )
  $('form').append($('<p class="warninglabel">').text('Digite um nome!'))
  $('form').append($('<label class="label">').text('Especialidade'))
  $('form').append(
    $('<select id="especialidade" class="selectespecialidades">')
  )
  $('form').append($('<button class="cadastrar">').text('Cadastrar'))

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

function processResult(response, dir, action){
  switch (action) {
    case "fill":
      fillSelections(response, dir)      
      break;
    
      case "table":
      createTable(response, dir)
      break
    default:
      break;
  }
}

function fillSelections(response, dir) {
  let field = dir.toLowerCase().split('.')[0]
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

function createTable(response, dir){
  clearMain()
  waitingScreen('show')
  let especialidades = {1: "Cardiologista", 2: "Oftalmologista", 3:"Ortopedista", 4: "Oncologista", 5: "Cirurgia Geral", 6:"Anestesista",  7: "Psiquiatra"}
  let ths = []
  $('main').append('<table>')
  $('table').append('<tr>')
  $('tr').append('<th><th><th><th>')

  for (let index = 0; index < response.length; index++) {
    $('table').append('<tr class= "'+index+'">')
    for (let key in response[index]){
      if (ths.length < 4){
        ths.push(key)
      }
    if(key =='id'){ 
      let id = response[index][key]
      console.log(id)
      console.log(index)
      $('.'+index).addClass([id])
      $('.'+id).removeClass([index])

      
    } else if(key == 'idEspecialidade'){

      $('table').append($('<td>').text(especialidades[response[index][key]]))
    } else {

      $('table').append($('<td>').text(response[index][key]))  
    }
  }

  }

  waitingScreen('none')
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
