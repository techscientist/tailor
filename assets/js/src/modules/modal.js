module.exports = Marionette.Module.extend( {

    /**
     * Initializes the module.
     *
     * @since 1.0.0
     */
	onStart : function() {
        var ModalView = require( './modal/show/modal' );
		var api = {

            /**
             * Opens a modal window to edit the given element.
             *
             * @since 1.0.0
             *
             * @param model
             */
			openModal : function( model ) {

                // Closes the current modal window and prompts the user to save any unsaved changes
                if ( app.modal.hasView() ) {
                    if ( model === app.modal.currentView.model ) {
                        return;
                    }

                    app.modal.currentView.triggerMethod( 'close' );
                }

                app.modal.show( new ModalView( {
                    model : model
                } ) );
			},

            /**
             * Closes the current modal window.
             *
             * @since 1.0.0
             */
            closeModal : function() {
                app.modal.empty();
            }
		};

		this.listenTo( app.channel, 'modal:open', api.openModal );
		this.listenTo( app.channel, 'elements:reset', api.closeModal );
    }

} );