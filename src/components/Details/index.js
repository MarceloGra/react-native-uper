//  esse codigo fará chamada dinamicamente a api do google e o valor não ser mais fixo
import React, { Component } from 'react';

import
  {
    Container,
    TypeTitle,
    TypeDescription,
    TypeImage,
    RequestButton,
    RequestButtonText
  } from './styles';

import uberx from '../../assets/uberx.png';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fare: null // Inicialmente não há valor da tarifa disponível
    };
  }

  componentDidMount() {
    // Chamar a função para buscar as tarifas quando o componente é montado
    this.fetchUberFare();
  }

  fetchUberFare = async () => {
    // Simular coordenadas (latitude e longitude) obtidas da API do Google
    const latitude = 37.7749;
    const longitude = -122.4194;

    try {
      // Chamar a API do Uber para obter a tarifa com base nas coordenadas
      const response = await fetch(`API_DO_UBER/com/coordenadas?lat=${latitude}&lng=${longitude}`);
      const data = await response.json();
      
      // Extrair e definir o valor da tarifa no estado
      this.setState({ fare: data.price });
    } catch (error) {
      console.error('Erro ao buscar a tarifa do Uber:', error);
    }
  };

  render() {
    const { fare } = this.state;

    return (
      <Container>
        <TypeTitle>Popular</TypeTitle>
        <TypeDescription>Viagens baratas para o dia a dia</TypeDescription>

        <TypeImage source={uberx} />
        <TypeTitle>UberX</TypeTitle>
        <TypeDescription>{fare ? `R$${fare.toFixed(2)}` : 'Carregando...'}</TypeDescription>

        <RequestButton onPress={() => this.requestUberX()}>
          <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
        </RequestButton>
      </Container>
    );
  }

  requestUberX() {
    // Implemente a lógica para solicitar o UberX
    console.log('UberX solicitado!');
  }
}
