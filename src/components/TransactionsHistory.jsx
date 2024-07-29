import { useState, useEffect } from 'react';
import { Modal, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';

const TransactionsModal = ({ show, onHide }) => {
    const [transactions, setTransactions] = useState([]);
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (show) {
        const fetchData = async () => {
          try {
            const [transactionsResponse, fundsResponse] = await Promise.all([
              axios.get(`${import.meta.env.VITE_API_URL}/clientsTransactions/getAll/1`),
              axios.get(`${import.meta.env.VITE_API_URL}/funds/getAll`)
            ]);
  
            const sortedTransactions = transactionsResponse.data.transactions.sort((a, b) => 
              new Date(a.transactionDate) - new Date(b.transactionDate)
            );
  
            setTransactions(sortedTransactions);
            setFunds(fundsResponse.data);
          } catch (error) {
            /*console.error('Error obteniendo información de cliente:', error);*/
          } finally {
            setLoading(false);
          }
        };
  
        fetchData();
      }
    }, [show]);
  
    const getFundDetails = (idFund) => {
      const fund = funds.find(fund => fund.idFund === idFund);
      return fund ? `${fund.category} - ${fund.name}` : 'Unknown Fund';
    };
  
    const getStatusLabel = (isCanceled) => {
      return isCanceled === false ? 
        <span className="badge bg-success">Activo</span> : 
        <span className="badge bg-danger">Cancelado</span>;
    };
  
    const formatDateTime = (dateTime) => {
      const date = new Date(dateTime);
      return date.toLocaleString();
    };
  
    return (
      <Modal show={show} onHide={onHide} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Mis transacciones</Modal.Title>
        </Modal.Header>
        <Modal.Body className="scrollable-modal-body">
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p>Cargando información...</p>
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id Transacción</th>
                  <th>Fecha</th>
                  <th>Fondo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.idTransaction}>
                    <td>{transaction.idTransaction}</td>
                    <td>{formatDateTime(transaction.transactionDate)}</td>
                    <td>{getFundDetails(transaction.idFund)}</td>
                    <td>{getStatusLabel(transaction.isCanceled)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    );
  };
  
  export default TransactionsModal;