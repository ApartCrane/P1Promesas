// Ejercicio 1: Promesas Encadenadas

function numeros() {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                const nAle = Math.floor(Math.random() * 100) + 1;
                resolve(nAle);
                console.log("Numero aleatorio:", nAle)
            }, 2000);
        })
        .then((numero) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const nCua = (numero * numero)
                    resolve(nCua);
                    console.log("Su cuadrado es: ", nCua)
                }, 1000);
            });
        })
        .then((resultado) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const raiz = Math.sqrt(resultado);
                    resolve(raiz);
                    console.log("La raíz del último número es: ", raiz)
                }, 1000);
            });
        });
}

numeros().then(() => {
        console.log();
    })
    .catch((error) => {
        console.error(error);
    });

// Ejercicio 2: Promesa de Múltiples Solicitudes

function multiple(urls) {
    const promesas = urls.map(url => {
        return fetch(url).then(response => response.json());
    });

    return Promise.all(promesas);
}

const urls = [' https://pokeapi.co/api/v2/pokemon/ditto', 'https://pokeapi.co/api/v2/pokemon/mudkip', 'https://pokeapi.co/api/v2/pokemon/dragonite'];
multiple(urls).then(valores => {
        console.log("Ejercicio 2");
        console.log(valores);
    })
    .catch(error => {
        console.error(error);
    });


// Ejercicio 3: Promesas Paralelas
function ejecutarPromesasEnParalelo(funcionesPromesa) {
    const promesasPara = funcionesPromesa.map(func => func());
    return Promise.all(promesasPara);
}

const para1 = () => new Promise(resolve => setTimeout(() => resolve('Hola'), 4500));
const para2 = () => new Promise(resolve => setTimeout(() => resolve('Estas son'), 4500));
const para3 = () => new Promise(resolve => setTimeout(() => resolve('Promesas'), 4500));
const para4 = () => new Promise(resolve => setTimeout(() => resolve('En paralelo :D'), 4500));

const funPro = [para1, para2, para3, para4];

ejecutarPromesasEnParalelo(funPro)
    .then(final => {
        console.log("Ejercicio 3");
        console.log(final);
    })
    .catch(error => {
        console.error(error);
    });

// Ejercicio 4: Promesas en Cadena con Retraso
function cadenaDePromesas(n) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            for (let i = 1; i <= n; i++) {
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.log(i);
                        resolve();
                    }, i * n * 1000); 
                }).then(() => {
                    if (i === n) {
                        resolve("Todas las promesas se resolvieron");
                    }
                });
            }
        }, n * 1000);
    });
}

cadenaDePromesas(3)
    .then(resultado => {
        console.log(resultado);
    })
    .catch(error => {
        console.error(error);
    });

//Ejercicio 5: Promesa con Cancelación
function cancelarPromesa() {
    let cancelar;

    const promesa = new Promise((resolve, reject) => {
        cancelar = () => {
            reject("Hijole se cancelo la promesa");
        };

        setTimeout(() => {
            resolve("Exito se realizo la peticion");
        }, 5000);
    });

    return {
        promise,
        cancelar
    };
}

const {
    promesa,
    cancelar
} = cancelarPromesa();

promesa.then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error);
});

//Para cancelar la oepracion
//cancelar();