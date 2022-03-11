import roles from "../models/Roles";

export const createRoles = async() => {


    try {
        //existen documentos?
        const count = await roles.estimatedDocumentCount()
        if (count > 0) return;

        //ejecutamos las promesas al mismo tiempo 
        const values = await Promise.all([
            new roles({ name: 'usuario' }).save(),
            new roles({ name: 'moderador' }).save(),
            new roles({ name: 'admin' }).save()
        ])

    } catch (error) {
        console.error(error)
    }
}
