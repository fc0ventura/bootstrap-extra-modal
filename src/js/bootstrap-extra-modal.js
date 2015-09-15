// @TODO Refactor everything to be more like Object Oriented

// A wrapper to the Bootstrap 3 modal Javascript. It uses the HTML already on the page (the modal
// 'container' and adds remote HTML to it).
$.fn.bootstrapExtraModal = function(options) {
  var self = this;

  var defaults = {
    backdrop: 'static', // [BS setting] boolean or the string 'static'
    keyboard: false, // [BS setting] if true - closes the modal when escape key is pressed
    reload: false, // reload page when closing the modal
    position: 'default', // position of the modal (can be 'default', 'right', 'left')
    css: '', // custom css class to be added to the modal container
    openAnimation: 'jelly', // default open animation
    closeAnimation: 'unjelly', // default close animation
    pushContent: false, // Option used to move the boby
  };

  this.options = $.extend(defaults, options || {});

  var $element = $(this),
      $backdrop = null,
      $direction = self.options.position;

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
    $element.modal(self.options);
    $element.css('display', 'block');

    // Set modal type defaults
    switch (self.options.position) {
      case 'right':
        self.options.openAnimation = 'slide-right';
        self.options.closeAnimation = 'unslide-right';
        self.options.css = 'modal-right';
        $element.addClass(self.options.css + ' ' + self.options.openAnimation);
        self.pushContent('push-right');
        break;
      case 'left':
        self.options.openAnimation = 'slide-left';
        self.options.closeAnimation = 'unslide-left';
        self.options.css = 'modal-left';
        $element.addClass(self.options.css + ' ' + self.options.openAnimation);
        self.pushContent('push-left');
        break;
      default:
        $element.addClass(self.options.openAnimation);
        console.log(self.options.position);
    }

    $backdrop = $('.modal-backdrop');

    // Dismiss the modal when clicking on the backdrop
    $backdrop.click(function() { self.dismiss(); });

    this.afterShow();

    return $element;
  };

  this.pushContent = function(animation) {
    if (self.options.pushContent && self.options.position === 'right') {
      $('.push-content').addClass(animation);
    } else if (self.options.pushContent && self.options.position === 'left') {
      $('.push-content').addClass(animation);
    }
    return;
  };



  //---------------------------------------------------------------------------
  // Dismisses the modal. It also reloads the current page if options.reload is
  // set to true or it received reload parameter.
  //---------------------------------------------------------------------------
  this.dismiss = function() {
    $element.removeClass(self.options.closeAnimation);
    $element.removeClass(self.options.openAnimation);
    $element.addClass(self.options.closeAnimation);

    $backdrop.addClass('fade-out');
    $backdrop.removeClass('in');

    if (self.options.pushContent && self.options.position === 'right') {
      self.pushContent('unpush-right');
    } else if (self.options.pushContent && self.options.position === 'left') {
      self.pushContent('unpush-left');
    };

    setTimeout(function() {
      $element.modal('hide');
      $element.removeClass(self.options.css);
      $element.removeClass(self.options.closeAnimation);
      self.options.closeAnimation = '';
      self.options.position = '';

      if (self.options.pushContent) {
        $('.push-content').removeClass('push-right unpush-right push-left unpush-left');
      };

      if (self.options.reload) { location.reload(); }
    }, 200);
  };

  //---------------------------------------------------------------------------
  // Initializes objects and libraries that require the modal to be opened.
  //---------------------------------------------------------------------------
  this.afterShow = function() {
    // Modal dismiss button
    $('[data-dismiss="modal"]').click(function(e) {
      e.preventDefault();
      e.stopPropagation();
      self.dismiss();
    });
  };

  //---------------------------------------------------------------------------
  // Capture events to check if ESC key was pressed
  //---------------------------------------------------------------------------

  $(document).keyup(function(event) {
    if (event.keyCode == 27) {
      self.dismiss();
    }
  });

  $element.click(function(e){
    // Check if click was not triggered on or within .modal-dialog
    if (!$(e.target).closest('.modal-dialog').length > 0){
      self.dismiss();
    }
  });


  return self;
};
