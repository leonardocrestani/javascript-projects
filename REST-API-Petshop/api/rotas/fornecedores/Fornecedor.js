const TabelaFornecedor = require('./ModeloTabelaFornecedor.js');

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao }) {
        this.id = id;
        this.empresa = empresa;
        this.email = email;
        this.categoria = categoria;
        this.dataCriacao = dataCriacao;
        this.dataAtualizacao = dataAtualizacao;
    }

    // comunica com o banco de dados e salva novo fornecedor nele
    async criar(fornecedor) {
        const resultado = await TabelaFornecedor.create(fornecedor);

        // como id, dataCriacao e dataAtualizacao so foram criados na hora do create no banco
        // vamos pegar eles agora
        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao,
        this.dataAtualizacao = resultado.dataAtualizacao;

    }

    async listarPeloId() {
        const fornecedorEncontrado = await TabelaFornecedor.findOne({where: {id: this.id}});
        if(!fornecedorEncontrado) {
            throw new Error(`Fornecedor com o id: ${this.id} nao encontrado`);
        }
        else {
            this.empresa = fornecedorEncontrado.empresa;
            this.email = fornecedorEncontrado.email;
            this.categoria = fornecedorEncontrado.categoria;
            this.dataCriacao = fornecedorEncontrado.dataCriacao;
            this.dataAtualizacao = fornecedorEncontrado.dataAtualizacao;
        }
    }

    async atualiza() {
        const fornecedorEncontrado = await TabelaFornecedor.findOne({where: {id: this.id}});
        if(!fornecedorEncontrado) {
            throw new Error(`Fornecedor com o id: ${this.id} nao encontrado`);
        }
        else {
            const campos = ['empresa', 'email', 'categoria'];
            const dadosParaAtualizar = {};
            campos.forEach((campo) => {
                const valor = this[campo];
                if(typeof valor === 'string' && valor.length > 0) {
                    dadosParaAtualizar[campo] = valor;
                }
            })
            if(Object.keys(dadosParaAtualizar).length === 0) {
                throw new Error("Nao foram fornecidos dados para atualizar");
            }
            else {
                await TabelaFornecedor.update(dadosParaAtualizar, {where: {id: this.id}});
            }
        }
    }
}

module.exports = Fornecedor;