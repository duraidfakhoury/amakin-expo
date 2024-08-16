import { useEffect, useState } from "react";
import ProgressBarBox from "../../../components/pragressBarBox/ProgressBarBox";
import "./Tevent.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailsBox from "../../../components/detailsBox/DetailsBox";
import { ResponsiveContainer, Treemap } from "recharts";

const Popup = ({ isOpen, onClose, balance, invoiceAmount, onPay }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Payment Confirmation</h2>
        <p><strong>Current Balance:</strong> {balance}</p>
        <p><strong>Invoice Amount:</strong> {invoiceAmount}</p>
        <div className="popup-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onPay}>Pay</button>
        </div>
      </div>
    </div>
  );
};

const TEvent = () => {
  const { exhibitionId } = useParams(); // Extract the exhibitionId from the URL
  const [details, setDetails] = useState(null);
  const [exhibition, setexhibition] = useState({});
  const [boothId, setBoothId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [ balance , setBalance] = useState();
  useEffect(() => {
    const fetchParticipantDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/exhibition_participate/${exhibitionId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = response.data.data;
        setDetails(data);
        setBoothId(data.booth_id);
        if (data && data.exhibition) {
          setexhibition(data.exhibition);  // Set the exhibition details after fetching data
        }
      } catch (error) {
        console.error('Error fetching participation details:', error);
      }
    };
    const fetchwalletBalance = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/wallet`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = response.data.data;
        setBalance(data.amount);
      } catch (error) {
        console.error('Error fetching wallet balance:', error);
      }
    };
    fetchwalletBalance();
    fetchParticipantDetails();
  }, [exhibitionId]);

  // Only map booths data if details and exhibition are available
  const boothsData = details?.exhibition?.booths?.map(booth => ({
    name: `${booth.id}`,
    size: booth.size,
    price: booth.price,
    status: booth.status
  })) || [];  // Default to an empty array if no data
  const handlePayButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePay = async () => {
    // Handle the payment logic here
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/invoice/${details.invoice.id}/pay`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    } catch (error) {
      console.error('Error paying ', error);
    }
    setIsPopupOpen(false);
    // You might want to refresh the invoice status after payment
  };
  return (
    <div className="exhibition">
      <div className="box box1">
        {details ? (
          <DetailsBox exhibitionDetails={details.exhibition} />
        ) : (
          <p>Loading exhibition details...</p>
        )}
      </div>
      <div className="box box2">
        {exhibition && (
          <ProgressBarBox  
              icon="/productIcon.svg"
              title="exhibition Progress"
              startingDate={exhibition.start_date}
              endingDate={exhibition.end_date} />
        )}
      </div>
      <div className="box box4">
        <h1>Products at this exhibition</h1>
        <div className="products-list">
          <ul>
            {details?.exhibition_participate_products?.map((product) => (
              <li key={product.id}>
                <span>{product.product.name}</span>
                <span>{`${product.quantity} pieces`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="box box7">
      <h1>Representative at this exhibition</h1>
        <div className="rep-list">
          <ul>
            {details?.exhibition_participate_representatives?.map((rep) => (
              <li key={rep.id}>
                <span>{rep.representative.name}</span>
                <span>{`${rep.representative.visa_state}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="box box8">
        <span><strong>Your booth : </strong> {boothId}</span>
        <div className="chart">
          {boothsData.length > 0 && (
            <ResponsiveContainer width="99%" height="100%">
              <Treemap
                width={400}
                height={200}
                data={boothsData}
                dataKey="size"
                stroke="#fff"
                fill="#384256"
              />
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <div className="box box9">
          <h2>invoice state</h2>
          <div className="invoice-status">
            <div className="stat-texts">
            <span>status : {details?.invoice.status}</span>
            <span>amount {details?.invoice.amount}</span>
            </div>
            <button 
            onClick={handlePayButtonClick}
            disabled={details?.invoice?.status?.toLowerCase() === "paid"}>
            Pay
            </button>
          </div>
      </div>
      {
        isPopupOpen &&
        <Popup 
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
        balance={balance} 
        invoiceAmount={details?.invoice?.amount} 
        onPay={handlePay} 
      />
      }
    </div>
  );
};

export default TEvent;
