$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      
      (function() {
        emailjs.init("PwxetKe5e6ltDB1uz");
      })();
      Swal.fire({
        title: "Enviando mensaje!",
        icon: "success",
        draggable: true
      });
      
        emailjs.send("service_byoe0kk", "template_4wuzzyc", {
          from_name: "Tu Nombre",
         message: "El Usuario: " + name + " ha mandado un mensaje: " + email + " " + message,
  to_email: "rosalbasan810@gmail.com"
        })
        .then(response => {
          Swal.fire({
            title: "Correo enviado exitosamente!",
            icon: "success",
            draggable: true
          });
        })
        .catch(error => {
          
          Swal.fire({
            title: "Error al nenviar el correo!",
            icon: "error",
            draggable: true
          });
        });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
