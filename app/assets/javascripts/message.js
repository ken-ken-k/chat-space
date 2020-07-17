$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html = 
      `<div class="chat-box">
        <div class="chat-box__top">
          <div class="chat-name">
            ${message.user_name}
          </div>
          <div class="chat-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-box__message">
          ${message.content}
        </div>
      </div>`
      return html;
    } else {
      let html = 
      `<div class="chat-box">
        <div class="chat-box__top">
          <div class="chat-name">
            ${message.user_name}
          </div>
          <div class="chat-date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-box__message">
            ${message.content}
        </div>
      </div>`
      return html;
    };
  }
       
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__massage-list').append(html);      
      $('form')[0].reset();
      $('.Chat-main__massage-list').animate({ scrollTop: $('.Form')[0].scrollHeight});
      $('.Form__submitBtn').prop('disabled', false);
    })
    .fail(function(){
      alert("エラーです")
    })
  });
});