import { useState, useEffect  } from 'react';
import { Container, Card, Row, Col, Button, Image, Toast } from 'react-bootstrap';
import FundsItem from './FundsItem';
import TransactionsHistory from './TransactionsHistory';
import NotificationButton from './NotificationButton';
import { getClientTransactionsActive } from '../api/client';
import { getAllFunds } from '../api/fund';
import 'bootstrap/dist/css/bootstrap.min.css';
import logoImage from '/public/BPAC3.SA_BIG.svg';

function ClientInfo({ idClient }) {
    
    const [modalShow, setModalShow] = useState(false);
    const [funds, setFunds] = useState([]);
    const [notification, setNotification] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [clientData, setClientData] = useState({
        idClient: 0,
        fullName: '',
        email: '',
        phone: '',
        amount: 0,
        avaiableAmount: 0,
        investedAmount: 0,
        transactions: []
    });

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await getClientTransactionsActive(idClient);
                const { fullName, email, phone, amount, avaiableAmount, investedAmount, transactions } = response;
                setClientData({ idClient, fullName, email, phone, amount, avaiableAmount, investedAmount, transactions });
                setNotificationsEnabled(notificationsEnabled);
            } catch (error) {
                /*console.error('Error obteniendo toda la información de un cliente:', error);*/
            }
        };

        const fetchFunds = async () => {
            try {
                const response = await getAllFunds();
                setFunds(response);
            } catch (error) {
                /*console.error('Error obteniendo toda la información de los fondos:', error);*/
            }
        };

        fetchClientData();
        fetchFunds();
    }, [idClient]);

    const transactionsByFund = clientData.transactions.reduce((acc, transaction) => {
        acc[transaction.idFund] = transaction;
        return acc;
    }, {});

    const availableAmountClass = clientData.avaiableAmount === 0 ? 'text-danger' : 'text-success';

    const handleUpdate = async () => {
        try {
            const response = await getClientTransactionsActive(idClient);
            const { amount, avaiableAmount, investedAmount } = response;
            setClientData(prevData => ({ ...prevData, amount, avaiableAmount, investedAmount }));
        } catch (error) {
            /*console.error('Error actualizando la información de los montos:', error);*/
        }
    };

    const handleNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 10000);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Card className='bg-white' style={{ width: '1000px', borderRadius: '10px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                    <Image src={logoImage} style={{ width: '35%' }} fluid />
                    </Card.Title>
                    <Row className="mb-4">
                        <Col md={6} className="p-2">
                            <Card className="bg-white p-3 h-100">
                                <Card.Text>{ clientData.fullName }</Card.Text>
                                <Card.Text>{ clientData.email }</Card.Text>
                                <Card.Text>{ clientData.phone }</Card.Text>
                                <Card.Text><NotificationButton idClient={idClient} /></Card.Text>
                            </Card>
                        </Col>
                        <Col md={6} className="p-2">
                            <Card className="bg-white p-3 h-100">
                                <Card.Text><strong>Monto inicial: </strong> $ { clientData.amount }</Card.Text>
                                <Card.Text className={availableAmountClass}><strong>Monto disponible: </strong> $ { clientData.avaiableAmount }</Card.Text>
                                <Card.Text className="text-warning"><strong>Monto invertido: </strong> $ { clientData.investedAmount }</Card.Text>
                            </Card>
                        </Col>
                        <Col md={12} className="d-grid gap-2">
                            <Button variant="outline-primary" size="md" onClick={() => setModalShow(true)}> Mis suscripciones </Button>
                            <TransactionsHistory show={modalShow} onHide={() => setModalShow(false)} idClient={idClient} />
                        </Col>
                    </Row>
                    <hr className='p-1' />
                    {funds.map(fund => (
                        <FundsItem 
                            key={fund.idFund} 
                            fund={fund} 
                            isSubscribed={!!transactionsByFund[fund.idFund]} 
                            idClient={idClient}
                            onUpdate={handleUpdate}
                            onNotification={handleNotification}
                        />
                    ))}
                </Card.Body>
            </Card>
            {notification && (
                <Toast style={{ position: 'absolute', bottom: 20, right: 20 }}>
                <Toast.Body>{notification}</Toast.Body>
                </Toast>
            )}
        </Container>
    );
}

export default ClientInfo