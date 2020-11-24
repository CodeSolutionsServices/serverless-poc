# Serverless POC

- Instalamos serveless (lo he instalado de manera local con yarn add serverless)
- el archivo CSV de AWS, copiamos donde están los datos y ejecutamos:
  `node aws.js [PEGAR_TEXTO]`
- obtenemos los parámetros formateados para poder agregarlos al siguiente comando.
- ejecutamos el siguiente comando para configurar las credenciales de aws con serveless:

`yarn serverless config credentials --provider aws --profile NOMBRE_PERFIL_CREADO --key CLAVE_DEL_PERFIL_CREADO --secret SECRETO_PERFIL_CREADO`,

- creamos el directorio donde estará el proyecto
`mkdir aws && cd $_`

- ejecutamos el comando:
`yarn serverless create --template aws-nodejs --name slspoc`


Explicacion YAML:

```yaml
service: slspoc # Nombre que le hemos dado al proyecto
frameworkVersion: "2" # Version de SLS

provider: # Config del Proveedor Cloud
  name: aws # nombre del proveedor
  runtime: nodejs12.x # versión de nodejs

functions: # Declaración de cloud Functions
  hello: # Nombre del método que se expone
    handler: handler.hello # Función que se expone como lambda function
    events: # eventos que admite nuestra lambda functions
        - http: # servicio http que admite
            path: hello # Path del endpoint
            method: get # verbo http
```

- Los tres parámetros que siempre van a estar el las lambdas, event, context y callback. Aunque en nuestro ejemplo no se informan nada mas que uno, estos son los parámetros:

```js
'use strict';

exports.handler = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Go Serverless v1.0! Your function executed successfully!, Hello Word!',
          input: event,
        })
    });
    callback(null, response);
};
```

> event: objeto de evento del disparador le manda lambda
> context: contexto de ejecución
> callback (opcional): le envía una respuesta al disparador.

- Deploy nuestra lambda:

`yarn serverless deploy`
