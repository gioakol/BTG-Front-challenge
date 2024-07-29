import { Card } from 'react-bootstrap';
import SubscriptionButton from './SubscriptionButton';

const FundsItem = ({ fund, isSubscribed, idClient, onUpdate, onNotification }) => {
    return (
        <Card className="bg-white mb-4 p-3">
            <Card.Body>
                <Card.Title>{fund.category} - {fund.name}</Card.Title>
                <Card.Text><strong>Monto mínimo de vinculación:</strong> $ {fund.minimumAmount}</Card.Text>
                <SubscriptionButton idClient={idClient} idFund={fund.idFund} isActive={isSubscribed} onUpdate={onUpdate} onNotification={onNotification} />
            </Card.Body>
        </Card>
    );
};

export default FundsItem;