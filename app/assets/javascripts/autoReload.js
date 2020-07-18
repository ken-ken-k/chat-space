$(function(){
    function buildHTML(message){
      if ( message.image ) {
        let html = 
        `<div class="chat-box" data-message-id=${message.id}>
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
        `<div class="chat-box" data-message-id=${message.id}>
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
        
    let reloadMessages = function() {
      let last_message_id = $('.chat-box:last').data("message-id") || 0;
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
         let insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.Chat-main__massage-list').append(insertHTML);
          $('.Chat-main__massage-list').animate({ scrollTop: $('.Chat-main__massage-list')[0].scrollHeight});
         }
        })
        .fail(function() {
          alert('error');
        });
      };
      setInterval(reloadMessages, 7000);
  });