const URL = 'https://tiagoifsp.ddns.net/clinicaMedica/'
const MEDICOS = 'medicos.php'
const PACIENTES = 'pacientes.php'
const CONSULTAS = 'consultas.php'
const ESPECIALIDADES = 'especialidades.php'

$(document).ready(function () {
  //quando o DOM estiver completamente carregado, executa a função-parametro
  waitingScreen('none')
  $('.addAppointment').click(e => {
    e.preventDefault()
    createInputAppointment()
  })
  $('.addPatient').click(e => {
    e.preventDefault()
    createInputPatient()
  })
  $('.addDoctor').click(e => {
    e.preventDefault()
    createInputDoctor()
  })
  $('.listDoctor').click(e => {
    e.preventDefault()
    getData(URL, MEDICOS, 'table')
  })
  $('.listPatient').click(e => {
    e.preventDefault()
    getData(URL, PACIENTES, 'table')
  })
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
    warnMedico: $('<p>').text('Médico inválido').addClass('text-danger warnmedico'),
    labelPaciente: $('<label>').text('Paciente').addClass('h5 form-label'),
    selectPaciente: $('<select class=" form-select selectpacientes"></select>'),
    warnPaciente: $('<p>').text('Paciente inválido').addClass('text-danger warnpaciente'),
    labelData: $('<label>').text('Data da consulta').addClass('h5 form-label'),
    inputData: $('<input id="data" type="date"></input>').addClass(
      'form-control'
    ),
    warnData: $('<p>')
      .text('Selecione uma data valida')
      .addClass('text-danger warndata'),
    labelHora: $('<label>').text('Hora da consulta').addClass('h5 form-label'),
    inputHora: $('<input id="hora" type="time">').addClass('form-control'),
    warnHora: $('<p>')
      .text('Selecione um horario valido')
      .addClass('text-danger warnhora'),
    botaoCadastrar: $('<button>')
      .text('Cadastrar')
      .addClass('cadastrar btn btn-dark')
  } // um objetao com os campos da pagina

  let form = $('<form>')
  Object.keys(elements).forEach(key => {
    //itera o objeto e da append na main
    form.append(elements[key])
  })

  $('main').append($('<div>').addClass(['col-4', 'm-auto']))
  $('.col-4').append(form)
  $('input, select').change(function (e){
    let vetor = checkInputs('Consulta')[1]

    let p = $('.warnmedico')
      if(vetor[0]){
        let p = $('.warnmedico')
        changeWarn(p, 'ok')
    } else{
      changeWarn(p, 'invalid', 'Médico inválido')
    }
     p = $('.warnpaciente')
      if(vetor[1]){

        changeWarn(p, 'ok')
    } else{
      changeWarn(p, 'invalid','Paciente inválido')
    }
    p = $('.warndata')
      if(vetor[2] && vetor[4]){
        
        changeWarn(p, 'ok')
    } else {
      console.log('koe')
      changeWarn(p, 'invalid','Selecione uma data valida')
    }
    p = $('.warnhora')
      if(vetor[3]){        
        changeWarn(p, 'ok')
    } else {
      changeWarn(p, 'invalid','Selecione um horario valido')
    }
  })


  $('.cadastrar').click(function (e) {
    e.preventDefault()


    if (checkInputs('Consulta')[0]) {
      let data ={ //Requer parâmetros idPaciente e idMedico e data (no formato YYYY-MM-DD HH:mm)
        "idPaciente": $('.selectpacientes').val(),
        "idMedico": $('.selectmedicos').val(),
        "data":$('#data').val() + " " + $('#hora').val()
      }
      let p = $('.text-danger')
      p.text('Ok')
      p.addClass('text-success')
      p.removeClass('text-danger')
      postData(URL, CONSULTAS, data)
      createInputAppointment()
    } else {
      createJalert('fail', 'formulário', ' inválido')
    }
  })
}

function createInputPatient() {
  clearMain()
  $('main').append($('<div>').addClass(['col-4', 'm-auto']))
  $('.col-4').append($('<h2>').text('Cadastrar novo paciente'))
  $('.col-4').append($('<form>'))

  $('form').append($('<label>').text('Nome').addClass('h5 form-label'))
  $('form').append(
    $('<input id="nome" type="text" placeholder="Nome">').addClass(
      'h5 form-control'
    )
  )
  $('form').append($('<p>').text('Digite um nome!').addClass('text-danger warnnome'))

  $('form').append(
    $('<label>').text('Data de Nascimento').addClass('h5 form-label')
  )
  $('form').append($('<input id="data" type="date">').addClass('form-control'))
  $('form').append(
    $('<p>')
      .text('Selecione uma data de nascimento valida')
      .addClass('text-danger warndata')
  )
  $('form').append(
    $('<button>').text('Cadastrar').addClass('cadastrar btn btn-dark')
  )
  $('input').change(()=>{
    let vetor = checkInputs('Paciente')[1]

    let p = $('.warnnome')
      if(vetor[0]){
        changeWarn(p, 'ok')
    } else{
      changeWarn(p, 'invalid', 'Nome inválido')
    }
     p = $('.warndata')
      if(vetor[1] && vetor[2]){

        changeWarn(p, 'ok')
    } else{
      changeWarn(p, 'invalid','Data inválida')
    }
  })
  $('.cadastrar').click(function (e) {
    e.preventDefault()


    if (checkInputs('Paciente')[0]) {
      let data = {
        "nome": $('#nome').val(),
        "dataNascimento": $('#data').val()
      }
      p = $('.text-danger')
      p.text('Ok')
      p.addClass('text-success')
      p.removeClass('text-danger')
      postData(URL, PACIENTES, data)
      createInputPatient()
    } else {
      createJalert('fail', 'formulário', ' inválido')
    }
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
    $('<input id="nome" type="text" placeholder="Nome">').addClass(
      'form-control'
    )
  )
  $('form').append($('<p>').text('Digite um nome!').addClass('text-danger warnnome'))
  $('form').append($('<label>').text('Especialidade').addClass('h5 form-label'))
  $('form').append(
    $('<select id="especialidade" class=" form-select selectespecialidades">')
  )
  $('form').append(
    $('<p>').text('Selecione uma especialidade!').addClass('text-danger warnespecialidade')
  )
  $('form').append(
    $('<button>').text('Cadastrar').addClass('cadastrar btn btn-dark mt-3')
  )
  $('input, select').change(()=>{
  
    let vetor = checkInputs('Medico')[1]
    console.log(vetor)
    let p = $('.warnnome')
      if(vetor[0]){
        changeWarn(p, 'ok')
    } else{
      changeWarn(p, 'invalid', 'Nome inválido')
    }
     p = $('.warnespecialidade')
      if(vetor[1]){

        changeWarn(p, 'ok')
    } else{
      changeWarn(p, 'invalid','Especialidade inválida')
    }
  })

  $('.cadastrar').click(function (e) {
    e.preventDefault()

    if (checkInputs('Medico')[0]) {
      let data = {
        "nome": $('#nome').val(),
        "idEspecialidade": $('#especialidade').val() 
      }
      p = $('.text-danger')
      p.text('Ok')
      p.addClass('text-success')
      p.removeClass('text-danger')
      postData(URL, MEDICOS, data)
      createInputDoctor()

    } else {
      createJalert('fail', 'formulário', ' inválido')
    }
  })

}

function processResult(response, dir, action, id) {
  id = id || ''
  switch (action) {
    case 'fill': // preencher selects com options através de get
      fillSelections(response, dir)
      break

    case 'table':
      createTable(response, dir) // criar tabelas através de get
      break

    case 'modal':
      createModal(response, dir, id) // modal referente ao botão "consultas"
      break

    case 'store':
      return {"dados": response, "dir": dir, "id": id}

    default:
      break
  }
}

function fillSelections(response, dir) {
  let field = dir.toLowerCase().split('.')[0]
  $('.select' + field).append(
    $(' <option hidden disabled selected value="vazio"></option>')
  )

  for (let index = 0; index < response.length; index++) {
    $('.select' + field).append($('<option value="'+response[index].id+'">').text(response[index].nome))
  }
  waitingScreen('none')
}

function getData(URL, dir, action, id) {
  id = id || ''
  $.ajax({
    type: 'GET',
    url: URL + dir,
    data: 'data',
    dataType: 'JSON',
    success: function (response) {
      processResult(response, dir, action, id)
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
      createJalert('success', field, ' adicionado com sucesso!')
    },
    error: function () {
      createJalert('fail', field, ' não adicionado!')
    }
  })
}

function deleteData(URL, dir, id){
  let field = dir.toLowerCase().split('.')[0]
  $.ajax({
    type: 'DELETE',
    url: URL + dir + "?id=" + id,
    data: {"id": id},
    dataType: 'JSON',
    success: function () {
      createJalert('success', field, ' deletado com sucesso!')
      callAgain(dir)
    },
    error: function () {
      createJalert('fail', field, ' não deletado!')
    }
  })
}

function createTable(response, dir) {
  clearMain()
  waitingScreen('show')
  // vetor com as especialidades para linkar com idEspecialidades
  let especialidades = {
    1: 'Cardiologista',
    2: 'Oftalmologista',
    3: 'Ortopedista',
    4: 'Oncologista',
    5: 'Cirurgia Geral',
    6: 'Anestesista',
    7: 'Psiquiatra'
  }

  // vetor para armazenas as keys para os Theads
  let thsKeys = []

  // div que vai receber a tabela
  $('main').append($('<div>').addClass('col-8 m-auto'))

  //h2
  $('.col-8').append(
    $('<h2>').text('Lista de ' + dir.toLowerCase().split('.')[0])
  )

  //table
  $('.col-8').append($('<table>').addClass('table list-table'))

  //primeira tr com os th
  $('.list-table').append('<tr class="list-tr">')
  $('.list-tr').append(
    '<th class = "list-th" scope="col"><th class = "list-th" scope="col"><th class = "list-th" scope="col"><th class = "list-th" scope="col" colspan=3>'
  )

  // iterar json
  for (let index = 0; index < response.length; index++) {
    let id
    // row que vai receber os itens do elemento[index]
    $('.list-table').append('<tr scope="row" class= "' + index + '">')

    // armazena as keys no vetor para os Theads
    for (let key in response[index]) {
      if (thsKeys.length < 4) {
        thsKeys.push(adjustTH(key)) // adequa o texto que irá para os Theads para exibição na tabela
      }

      if (key == 'id') {
        id = response[index][key]

        $('.' + id).append($('<td>').text(especialidades[response[index][key]]))
        $('.' + index).addClass([id])
        $('.' + id).removeClass([index])
      } else if (key == 'idEspecialidade') {
        $('.' + id).append($('<td>').text(especialidades[response[index][key]])) // substitui o idEspecialidade pelo elemento correspondente no vetor Especialidades
      } else {
        $('.' + id).append($('<td>').text(response[index][key]))
      }
    }

    // Botoes 

    $('.' + id).append(

        $('<button value="' + id + '" >')
          .text('Ver consultas')
          .addClass('btn btn-success')
      )
    
    $('.' + id).append(

        $('<button value="' + id + '">')
          .text('Deletar')
          .addClass('btn btn-danger m-1')
      )
    
  }
  // Listeners Botões
  $('.btn-danger').click(e =>{
    e.preventDefault()
    let idButton = e.target.value
    deleteData(URL, dir, idButton)

  })


  $('.btn-success').click(e => {
    e.preventDefault()
    let idButton = e.target.value
    getData(URL, CONSULTAS, 'modal', idButton)
  })


  // Theads
  let ths = $('.list-th') //seleciona os theads
  thsKeys.shift() //retira o id do vetor com os theads
  thsKeys.push('Ações') // aciona "Ações" ao final do vetor

  for (let i = 0; i < thsKeys.length; i++) {
    ths[i].innerText = thsKeys[i] //altera os theads
  }

  // retirar modal de waiting
  waitingScreen('none')
}

/*function preAdjus(dir, id){
  getData(URL, dir, 'store', id)
}

function adjustNames(data, dir, idSent){
  switch (dir) {
    case MEDICOS:
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        if (data.id == idSent){
          return data.nome
        }
        
      }
      break;

    case PACIENTES:
      for (let index = 0; index < data.length; index++) {
        if (data.id == idSent){
          return data.nome
        }
      }
      break;
  
    default:
      break;
  }

}
*/

function changeWarn(p, status, msgm){
  msgm = msgm || ""
  if (status == 'ok'){
  p.text('Ok')
  p.addClass('text-success')
  p.removeClass('text-danger')
  } else {
    p.text(msgm)
    p.addClass('text-danger')
    p.removeClass(' text-success')
  }

}

function callAgain(dir, id){
  id = id || ""
  switch (dir) {
    case MEDICOS:
      getData(URL, MEDICOS, 'table')
      break;
    case PACIENTES:
      getData(URL, PACIENTES, 'table')
      break;

    case 'modal':
      getData(URL, PACIENTES, 'table')
      break;
  
    default:
      break;
  }
}
function adjustTH(key) {
  switch (key) {
    case 'idEspecialidade':
      return 'Especialidade'
    case 'nome':
      return 'Nome'
    case 'dataNascimento':
      return 'Data de Nascimento'
    case 'dataNascimento':
      return 'Data de Nascimento'
    case 'dataCadastro':
      return 'Data de Cadastro'
    case 'idPaciente':
      return 'Paciente'
    case 'idMedico':
      return 'Medico'
    case 'data':
      return 'Data da consulta'

    default:
      break
  }
}

function createModal(result, dir, id) {
  let thsKeysModal = []
  $('.modal-body').empty()
  $('#myModal').modal('show')
  $('#myModal').modal('toggle')

  $('.modal-body').append($('<table>').addClass('table modal-table'))
  $('.modal-table').append($('<th class="thmodal">'))
  $('.modal-table').append($('<th class="thmodal">'))
  $('.modal-table').append($('<th class="thmodal">'))
  $('.modal-table').append($('<th class="thmodal">'))
  let resultFilter = []
  for (let index = 0; index < result.length; index++) {
    for (let key in result[index]) {
      if (thsKeysModal.length < 4) {
        thsKeysModal.push(adjustTH(key)) // adequa o texto que irá para os Theads para exibição na tabela
      }

      if (result[index][key] == id) {
        resultFilter.push(result[index])
      }
    }
  }



  if (resultFilter.length != 0) {
    let ths = $('.thmodal')
    thsKeysModal.shift()
    thsKeysModal.push('Cancelar')
    for (let i = 0; i < thsKeysModal.length; i++) {
      ths[i].innerText = thsKeysModal[i] //altera os theads
    }

    for (let index = 0; index < resultFilter.length; index++) {

      $('.modal-table').append(
        $('<tr scope="row">').addClass('modal' + id + index)
      )
      for (let key in resultFilter[index]) {
        if(key != 'id'){
          $('.modal' + id + index).append(
            $('<td>').text(resultFilter[index][key])
          )

        }
      } 

      $('.modal' + id + index).append(
        $('<button class="btn btn-danger btn-dg-modal m-1">')
          .val(resultFilter[index].id)
          .text('Cancelar')
      )
    }
  } else {
    $('.modal-table').append($('<h3>').text('Nenhuma consulta registrada'))
  }

  $(".btn-dg-modal").click((e)=>{
    e.preventDefault()
    let idButton = e.target.value
    deleteData(URL, dir, idButton)
    $('#myModal').modal('toggle')
  })
}

function checkInputs(type) {
  let result = true
  let inputsValue
  let date, datenow
  switch (type) {
    case 'Paciente':
      date = $('#data')
      inputsValue = [$('#nome').val() != '']
      inputsValue.push(date.val() != '')
      date = new Date(date.val()).getTime()
      datenow = new Date().getTime()
      inputsValue.push(datenow > date)

      for (let index = 0; index < inputsValue.length; index++) {
        if (inputsValue[index] == false) {
          result = false
        }
      }
      return [result, inputsValue]

    case 'Medico':
      inputsValue = [$('input').val() != '']
      inputsValue.push($('option:selected').val() != 'vazio')
      for (let index = 0; index < inputsValue.length; index++) {
        if (inputsValue[index] == false) {
          result = false
        }
      }
      return [result, inputsValue]

    case 'Consulta':
      date = $('#data')
      inputsValue = [($('.selectmedicos ').val() != null)]

      inputsValue.push($('.selectpacientes').val() != null)
      inputsValue.push(date.val() != '')
      inputsValue.push($('#hora').val() != '')

      date = new Date(date.val()).getTime()
      datenow = new Date().getTime()
      inputsValue.push(datenow < date)

      for (let index = 0; index < inputsValue.length; index++) {
        if (inputsValue[index] == false) {
          result = false
        }
      }

      return [result, inputsValue]

    default:
      break
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
  $('#jAlert').text(value.slice(0, -1) + msg)
  $('#jAlert').addClass(att)
  setTimeout(function () {
    $('#jAlert').remove()
  }, 3000)
}
