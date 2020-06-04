import React, { Component } from 'react';
import Argument from './Argument';
import StarRatings from 'react-star-ratings';
import DialogDefault from './components/DialogDefault'

class PairArguments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id_1: '',
            _text_1: 'texto de Teste 1',
            _hits_1: '',

            _id_2: '',
            _text_2: 'texto de Teste 2',
            _hits_2: '',

            _is_argument_1: { id: '0', value: "Is it argument?", isChecked: false },
            _is_argument_2: { id: '1', value: "Is it argument?", isChecked: false },

            similarity: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRating = this.handleChangeRating.bind(this);

        this.handleRefresh = this.handleRefresh.bind(this);

    }

    componentDidMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    _id_1: res[0]._id,
                    _text_1: res[0].text,
                    _hits_1: res[0].hits,

                    _id_2: res[1]._id,
                    _text_2: res[1].text,
                    _hits_2: res[1].hits,

                    _is_argument_1: { id: res[0]._id, value: "Is it argument?", isChecked: true },
                    _is_argument_2: { id: res[1]._id, value: "Is it argument?", isChecked: true },
                });
            })
            .catch(err => console.log("ERRO:" + err));
    }

    callApi = async () => {
        const response = await fetch('http://localhost:8080/api/v1/argument/pair');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    };

    handleSubmit(event) {
        event.preventDefault();
        let url = "http://localhost:8080/api/v1/evaluate";
        let data = {
            text_1_id: this.state._id_1,
            text_1_is_argument: this.state._is_argument_1.isChecked,
            text_2_id: this.state._id_2,
            text_2_is_argument: this.state._is_argument_2.isChecked,
            similarity_star: this.state.similarity
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        }).then((result) => {
            if (result.status === 200) {
                result.json().then((resp) => {
                    alert("Thanks!")
                    this.handleRefresh(event);
                })
            } else {
                alert("Huston, we have a problem. Contact Admin")
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleCheckChieldElement = (event) => {
        const target = event.target;
        const value = target.checked;
        const name = target.name;
        const is_argument = this.state[name]
        is_argument.isChecked = value
        this.setState({
            [name]: is_argument
        });
    }

    handleChangeRating(newRating, name) {
        this.setState({
            similarity: newRating
        });
    }

    handleRefresh(event) {
        window.location.reload(false);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="rowC">
                        <div className="half">
                            <h4>Tópico 1</h4>
                        </div>
                        <div className="half">
                            <h4>Tópico 2</h4>
                        </div>
                    </div>
                    <div className='rowC centered'>
                        <div className="half">
                            <Argument text={this.state._text_1}
                                value="Dimmy"
                                name="_text_1"
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="half">
                            <Argument text={this.state._text_2}
                                value={this.state._text_2}
                                name="_text_2"
                                onChange={this.handleInputChange} />

                        </div>
                    </div>
                    <div className='rowC centered'>
                        <div className="half">
                            <label>
                                Este trecho é um argumento jurídico?
                            <input
                                    name="_is_argument_1" type="checkbox"
                                    checked={this.state._is_argument_1.isChecked}
                                    onChange={this.handleCheckChieldElement} />
                            </label>
                        </div>
                        <div className="half">
                            <label>
                                Este trecho é um argumento jurídico?
                            <input
                                    name="_is_argument_2" type="checkbox"
                                    checked={this.state._is_argument_2.isChecked}
                                    onChange={this.handleCheckChieldElement} />
                            </label></div>
                    </div>
                    <div>
                        <p>O quão semelhantes são esses dois trechos? (Marque 5 estrelas para argumentos altamente semelhantes e nenhuma caso contrário)</p>
                        <StarRatings
                            rating={this.state.similarity}
                            starRatedColor="blue"
                            changeRating={this.handleChangeRating}
                            numberOfStars={5}
                            name='similarity'
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Rotular" />
                    <input type="button" className="btn btn-success" value="Atualizar" onClick={this.handleRefresh} />


                </form>
                <DialogDefault title="Ajuda" open="Ajuda">
                    <b>1. </b>O sistema apresenta dois trechos retirados de acórdãos,
                        nomeados aqui de <b>Tópico 1</b> e <b>Tópico 2</b>.
                        O sistema tentará exibir trechos de argumentos do mesmo assunto jurídico.<br />
                    <b>2. </b>O usuário deve analisar cada texto e informar se aquele trecho é ou não uma argumento
                    jurídico. Por padrão o sistema considera que todos os trechos são argumentos jurídicos.
                    Desmarque o campo de seleção abaixo do respectivo texto se achar que não se
                    trata de um argumento jurídico. <br/>
                    <b>3. </b>Caso os textos sejam ambos argumentativos mas não possui nenhuma relação, a opção 
                    é submeter a rotulagem com 0 (zero) estrelas.<br/>
                    <b>4. </b>Caso os textos sejam ambos argumentativos mas são contraditórios, isto é, 
                    propõem conclusões divergentes sobre as mesmas premissas a opção é 
                    submeter a rotulagem com 0 (zero) estrelas.<br/>
                    <b>5. </b>Quanto tiver certeza de sua análise, clique em 'Rotular' para salvar os dados.<br/>

                </DialogDefault>
            </div>

        )
    }
}

export default PairArguments;