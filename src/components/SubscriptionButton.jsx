import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const SubscriptionButton = ({ idClient, idFund, isActive, onUpdate, onNotification }) => {
  const [followed, setFollowed] = useState(isActive);

  useEffect(() => {
    setFollowed(isActive);
  }, [isActive]);

  const toggleFollow = async () => {
    try {
      let response;

      if (followed) {
        response = await axios.put(`${import.meta.env.VITE_API_URL}/transactions/unscribe`, {
          idClient: idClient.toString(),
          idFund: idFund.toString()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post(`${import.meta.env.VITE_API_URL}/transactions/suscribe`, {
          idClient: idClient.toString(),
          idFund: idFund.toString()
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      setFollowed(!followed);
      onUpdate();
      onNotification(response.data.message);
    } catch (error) {
      /*console.error('Error realizando la suscripción/baja:', error);*/
      onNotification('Error al actualizar el estado de suscripción.');
    }
  };

  return (
    <Button
      variant={followed ? "outline-danger" : "outline-primary"}
      onClick={toggleFollow}
    >
      {followed ? "Dar de baja" : "Suscribirme"}
    </Button>
  );
};

export default SubscriptionButton;