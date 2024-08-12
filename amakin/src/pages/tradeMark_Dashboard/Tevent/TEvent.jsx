import { useEffect, useState } from "react";
import BigChartBox from "../../../components/bigChartBox/BigChartBox";
import ChartBox from "../../../components/chartBox/ChartBox";
import PieCartBox from "../../../components/pieCartBox/PieCartBox";
import ProgressBarBox from "../../../components/pragressBarBox/ProgressBarBox";
import {  chartBoxRevenue, chartBoxUser } from "../../../data";
import "./Tevent.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailsBox from "../../../components/detailsBox/DetailsBox";
import TopBox from "../../../components/topBox/TopBox";

const TEvent = () => {
  const { eventId } = useParams(); // Extract the eventId from the URL
  const [event, setEvent] = useState(null);
  const [booths, setBooths] = useState([]);

  const participate = {
    id: 3,
    user_id: 2,
    event_id: 3,
    booth_id: 11,
    created_at: "2024-08-09T17:28:47.000000Z",
    updated_at: "2024-08-09T17:28:47.000000Z",
    event_participate_products: [
        {
            id: 4,
            quantity: 36,
            product_id: 3,
            event_participate_id: 3,
            created_at: "2024-08-09T17:28:47.000000Z",
            updated_at: "2024-08-09T17:28:47.000000Z",
            product: {
                id: 3,
                name: "boattt",
                image: "/images/1723207040_phpBD01.tmp.jpg",
                slug: "boattt",
                user_id: 2,
                accepted_by_admin: 0,
                price: 500,
                description: "a boat to sale",
                created_at: "2024-08-09T12:37:20.000000Z",
                updated_at: "2024-08-09T12:37:20.000000Z",
                category_products: [
                    {
                        id: 4,
                        category_id: 4,
                        product_id: 3,
                        created_at: "2024-08-09T12:37:20.000000Z",
                        updated_at: "2024-08-09T12:37:20.000000Z",
                        category: {
                            id: 4,
                            name: "category3",
                            created_at: "2024-08-09T12:26:38.000000Z",
                            updated_at: "2024-08-09T12:26:38.000000Z"
                        }
                    }
                ]
            }
        },
        {
            id: 5,
            quantity: 25,
            product_id: 1,
            event_participate_id: 3,
            created_at: "2024-08-09T17:28:47.000000Z",
            updated_at: "2024-08-09T17:28:47.000000Z",
            products: {
                id: 1,
                name: "Product",
                image: "/images/1723206981_phpD5F6.tmp.jpg",
                slug: "product",
                user_id: 2,
                accepted_by_admin: 0,
                price: 100,
                description: "The Productt",
                created_at: "2024-08-09T12:36:21.000000Z",
                updated_at: "2024-08-09T12:36:21.000000Z",
                category_products: [
                    {
                        id: 1,
                        category_id: 5,
                        product_id: 1,
                        created_at: "2024-08-09T12:36:21.000000Z",
                        updated_at: "2024-08-09T12:36:21.000000Z",
                        category: {
                            id: 5,
                            name: "category1",
                            created_at: "2024-08-09T12:26:51.000000Z",
                            updated_at: "2024-08-09T12:26:51.000000Z"
                        }
                    },
                    {
                        id: 2,
                        category_id: 3,
                        product_id: 1,
                        created_at: "2024-08-09T12:36:21.000000Z",
                        updated_at: "2024-08-09T12:36:21.000000Z",
                        category: {
                            id: 3,
                            name: "category4",
                            created_at: "2024-08-09T12:26:31.000000Z",
                            updated_at: "2024-08-09T12:26:31.000000Z"
                        }
                    }
                ]
            }
        }
    ],
    event_participate_representatives: [
        {
            id: 3,
            representative_id: 2,
            event_participate_id: 3,
            created_at: "2024-08-09T17:28:47.000000Z",
            updated_at: "2024-08-09T17:28:47.000000Z",
            representative: {
                id: 2,
                user_id: 2,
                name: "abd algalil shisha",
                image: "/images/1723206801_php1A11.tmp.jpg",
                email: "abd.shisha@gmail.com",
                phone: "2222222",
                passport_number: 963258741,
                visa_state: "accepted",
                created_at: "2024-08-09T12:33:21.000000Z",
                updated_at: "2024-08-09T12:33:21.000000Z"
            }
        },
        {
            id: 4,
            representative_id: 1,
            event_participate_id: 3,
            created_at: "2024-08-09T17:28:47.000000Z",
            updated_at: "2024-08-09T17:28:47.000000Z",
            representative: {
                id: 1,
                user_id: 2,
                name: "ahamd zokini",
                image: "/images/1723206787_phpE1BB.tmp.jpg",
                email: "ahamad.zokini@gmial.com",
                phone: "11111111",
                passport_number: 987654321,
                visa_state: "accepted",
                created_at: "2024-08-09T12:33:07.000000Z",
                updated_at: "2024-08-09T12:33:07.000000Z"
            }
        }
    ],
    invoice: {
        id: 2,
        amount: 200500,
        event_participate_id: 3,
        status: "unpaid",
        created_at: "2024-08-09T17:28:47.000000Z",
        updated_at: "2024-08-09T17:28:47.000000Z"
    },
    user: {
        id: 2,
        name: "mohamad arnoos",
        email: "mohamad.arnoos@gmail.com",
        phone: "22222222",
        role: "trademark_owner",
        accepted_by_admin: 1,
        trademark_name: "woooooooo",
        email_verified_at: null,
        device_key: null,
        image: "/no-image.jpg",
        created_at: "2024-08-09T12:17:17.000000Z",
        updated_at: "2024-08-09T12:17:17.000000Z"
    }
}
const eventy = {
  id: 1,
  name: "event 1",
  location: "event 1 location",
  description: "event 1 description",
  start_date: "2024-08-06",
  end_date: "2024-08-15",
  created_at: "2024-08-09T12:21:57.000000Z",
  updated_at: "2024-08-09T12:21:57.000000Z",
  booths: [
      {
          id: 1,
          event_id: 1,
          user_id: null,
          size: 1500,
          price: 300,
          status: "reserved",
          created_at: "2024-08-09T12:22:23.000000Z",
          updated_at: "2024-08-09T17:15:32.000000Z"
      },
      {
          id: 2,
          event_id: 1,
          user_id: null,
          size: 1600,
          price: 310,
          status: "available",
          created_at: "2024-08-09T12:22:35.000000Z",
          updated_at: "2024-08-09T12:22:35.000000Z"
      },
      {
          id: 3,
          event_id: 1,
          user_id: null,
          size: 2000,
          price: 400,
          status: "available",
          created_at: "2024-08-09T12:22:43.000000Z",
          updated_at: "2024-08-09T12:22:43.000000Z"
      },
      {
          id: 4,
          event_id: 1,
          user_id: null,
          size: 500,
          price: 100,
          status: "available",
          created_at: "2024-08-09T12:22:51.000000Z",
          updated_at: "2024-08-09T12:22:51.000000Z"
      },

  ]
}
useEffect(() => {
  const fetchEventDetails = async () => {
    try {
      console.log(participate.event_id)
      const response = await axios.get(`http://127.0.0.1:8000/api/event/${participate.event_id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEvent(response.data.data);
      const boothsResponse = await axios.get(`http://127.0.0.1:8000/api/booth/event/${participate.event_id}/index`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBooths(boothsResponse.data.data);
      } catch (error) {
        console.error('Error fetching event details or booths:', error);
      }
  };

}, [participate.event_id]);

  return (
    <div className="event">
      <div className="box box1">
      {eventy ? <DetailsBox EventDetails={eventy}/> : <p>Loading event details...</p>}
      </div>
      <div className="box box2">
        box2
      </div>
      <div className="box box3">
        box3
      </div>
      <div className="box box4">
        <h2>Products at this Event</h2>
        <div className="products-list">
        <ul>
            {participate.event_participate_products &&
              participate.event_participate_products.map((product) => (
                <li key={product.id}>
                  <span>{product.product.name}</span>
                  <span>{`${product.product.price}$`}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="box box5">box5</div>
      <div className="box box6">
        box6
      </div>
      <div className="box box7">
        box7
      </div>
      <div className="box box8">
      box8
      </div>
      <div className="box box9">box9</div>
    </div>
  );
};

export default TEvent;
