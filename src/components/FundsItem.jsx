import { useState , useEffect} from 'react';
import { Card, Form } from 'react-bootstrap';
import SubscriptionButton from './SubscriptionButton';

const FundsItem = ({ fund, isSubscribed, idClient, onUpdate, onNotification }) => {
    const [amount, setAmount] = useState('');
    const [isTextBoxDisabled, setIsTextBoxDisabled] = useState(isSubscribed);

    useEffect(() => {
        setIsTextBoxDisabled(isSubscribed);
    }, [isSubscribed]);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || !isNaN(value)) {
            setAmount(value);
        }
    };

    const handleSubscriptionUpdate = () => {
        setIsTextBoxDisabled(!isTextBoxDisabled); 
        onUpdate(); 
    };

    return (
        <Card className="bg-white mb-4 p-3">
            <Card.Body>
                <Card.Title>{fund.category} - {fund.name}</Card.Title>
                <Card.Text><strong>Monto mínimo de vinculación:</strong> $ {fund.minimumAmount}</Card.Text>
                <Form.Group controlId="formAmount">
                    <Form.Control 
                        type="number" 
                        step="0.01" 
                        disabled={isTextBoxDisabled}
                        value={amount} 
                        onChange={handleAmountChange} 
                        placeholder={`Monto mínimo: ${fund.minimumAmount}`}
                    />
                </Form.Group>
                <br/>
                <SubscriptionButton 
                    idClient={idClient} 
                    idFund={fund.idFund} 
                    isActive={isSubscribed} 
                    onUpdate={handleSubscriptionUpdate}
                    onNotification={onNotification} 
                    amount={amount}  
                    minimumAmount={fund.minimumAmount} 
                />
            </Card.Body>
        </Card>
    );
};

export default FundsItem;
