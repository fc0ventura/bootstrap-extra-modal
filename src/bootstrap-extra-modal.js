// @TODO list
// - Add $(selector) as an option
// - Add openAnimation as an option

// A wrapper to the Bootstrap 3 modal Javascript. It uses the HTML already on the page (the modal
// 'container' and adds remote HTML to it).
var Modal = function(options) {
  var self = this;

  var defaults = {
    backdrop: 'static', // [BS setting] boolean or the string 'static'
    keyboard: false, // [BS setting] if true - closes the modal when escape key is pressed
    element: '#ajax-modal', // the selector for the modal (the container on the DOM)
    reload: false, // reload page when closing the modal
    position: 'default', // position of the modal (can be 'default' or 'right')
    css: '',
    closeAnimation: 'unjelly'
  };

  this.options = $.extend(defaults, options || {});

  var $element = $(self.options.element),
      $backdrop = null;

  // Add custom css class to modal
  $element.addClass(self.options.css);

  //---------------------------------------------------------------------------
  // Set the modal HTML content. This function will attach the DOM HTML to the
  // modal container that is already on the page.
  //---------------------------------------------------------------------------
  this.content = function(contentHTML) {
    var dialog = $element.find('.modal-dialog');
    dialog.html(contentHTML);
    return this;
  };

  //---------------------------------------------------------------------------
  // Show the modal. You should always call this.content() first to build the
  // modal DOM.
  //---------------------------------------------------------------------------
  this.show = function() {
    $element.removeClass(self.options.closeAnimation);

    // Initialize the BS modal
    $element.modal(this.options);

    $backdrop = $('.modal-backdrop');

    // Dismiss the modal when clicking on the backdrop
    $backdrop.click(function() { self.dismiss(); });

    this.afterShow();

    return $element;
  };

  //---------------------------------------------------------------------------
  // Dismisses the modal. It also reloads the current page if options.reload is
  // set to true or it received reload parameter.
  //---------------------------------------------------------------------------
  this.dismiss = function() {
    $element.removeClass(self.options.closeAnimation);
    $element.addClass(self.options.closeAnimation);

    $backdrop.addClass('fade-out');
    $backdrop.removeClass('in');

    setTimeout(function() {
      $element.modal('hide');
      $element.removeClass(self.options.css);
      $element.removeClass(self.options.closeAnimation);
      self.options.closeAnimation = '';

      if (self.options.reload) { location.reload(); }
    }, 200);
  };

  //---------------------------------------------------------------------------
  // Initializes objects and libraries that require the modal to be opened.
  //---------------------------------------------------------------------------
  this.afterShow = function() {
    CopyClipboard.initialize();
    LoadingButtons.initialize();

    // Modal dismiss button
    $('.js-dismiss-modal').click(function() { self.dismiss(); });
    $('[data-dismiss="modal"]').click(function(e) {
      e.preventDefault();
      self.dismiss();
    });
  };

  // Capture events to check if ESC key was pressed
  $(document).keyup(function(event) {
    if (event.keyCode == 27) {
      self.dismiss();
    }
  });

  // Captures click event outside modal and dismisses it
  $(document).click(function(e){
    if (self.options.position === 'default') {
      // Check if click was not triggered on or within .modal-dialog
      if ($(e.target).closest('.modal-dialog').length == 0) self.dismiss();
    }
  });
}
