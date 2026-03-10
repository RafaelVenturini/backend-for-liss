export const swaggerOpts = {
    openapi: {
        info: {
            title: "Backliss API",
            version: "1.0.0",
            description: "Backend for liss"
        },
        tags: [
            {name: 'Alterador - Fitness', description: 'Alterações no catálogo fitness'},
            {name: 'Argos - Fashion', description: 'Cadastramento de produtos no Moda'},
            {name: 'Catalogo - Fitness', description: 'Ações para o Catalogo Fitness'},
            {name: 'Database', description: 'Relacionados a alterações no banco de dados'},
            {name: 'Front Utils', description: 'Coisas que podem beneficiar qualquer um dos frontends'},
            {name: 'Health', description: 'Testes para saber da procedencia do funcionamento do backend'},
            {name: 'Tiendanube', description: 'Relacionados à plataforma Nuvemshop'},
            {name: 'Tiny', description: 'Relacionados ao ERP Tiny'},
            {name: 'Zuma ERP', description: 'Relacionados ao ERP Zuma'},
            {name: 'default', description: 'Preguiça imensa'},
        ]
    }
}

export const swaggerUiOpts = {routePrefix: '/docs'}