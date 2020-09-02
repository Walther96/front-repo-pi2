export const notifyConstant = {
    danger: {
        type: 'danger',
        timer: 4000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    },
    warning: {
        type: 'warning',
        timer: 2 * 1000,
        placement: {
            from: 'top',
            align: 'right'
        },
        template: '<div data-notify="container" class="col-11 col-md-4 alert alert-{0} alert-with-icon" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss"><i class="nc-icon nc-simple-remove"></i></button><span data-notify="icon" class="nc-icon nc-bell-55"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    },
    titleSuccesss: 'Correcto!',
    titleWarning: 'Alerta',
    titleError: 'Error',
    optionsSuccess: {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-bottom-right"
    },
    optionsWarning: {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: "toast-bottom-right"
    },
    optionsError: {
        timeOut: 4000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: "toast-bottom-right"
    },
    messages: {
        success: '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Correcto <b>registro/actualización</b> - se realizó de forma satisfactoria.</span>',
        sinregistrosparaprocesar: '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Alerta <b>Sin registros para procesar</b> - No se cuenta con registros para procesar, por favor seleccione y/o especifique los datos que desa sean procesados.</span>',
        desdeMayorQueHasta: '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Alerta <b>Periodos incorrectos</b> - El periodo de inicio no puede ser mayor que el periodo fin</span>',
        debeSeleccionarRegistro: '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Alerta <b>debe serleccionar un registro</b> - para proceder con el tratamiento respecivo..</span>',
    }

}