import { Testimonial } from '../models/Testimonial.js'

const guardarTestimoniales = async(req, res) => {
    //validar
    const {nombre, email, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() === '' || email.trim() === '' || mensaje.trim() === '') {
        errores.push({mensaje: 'Todos los campos son obligatorios.'});
    }

    // if (email.trim() === '') {
    //     errores.push({mensaje: 'El email esta vacío.'});
    // }

    // if (mensaje.trim() === '') {
    //     errores.push({mensaje: 'El mensaje esta vacío.'});
    // }

    if (errores.length > 0) {
        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();
        //MOstrar la vista con errroes
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            email,
            mensaje,
            testimoniales
        })
    }else{
        try {
            await Testimonial.create({
                nombre,
                email,
                mensaje
            })

            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error);
        }
    }

}

export {
    guardarTestimoniales
}