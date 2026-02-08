import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ViewCard = () => {
  const { shareCode } = useParams<{ shareCode: string }>();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shareCode) return;

    const fetchCard = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("love_cards")
        .select("*")
        .eq("share_code", shareCode)
        .single();

      if (!error) setCard(data);
      setLoading(false);
    };

    fetchCard();
  }, [shareCode]);

  if (!shareCode)
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        No share code provided.
      </div>
    );

  if (loading)
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        Loading love ❤️...
      </div>
    );

  if (!card)
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        Card not found ❌
      </div>
    );

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(to right, #ff758c, #ff7eb3)",
      }}
    >
      <div
        style={{
          padding: "40px",
          borderRadius: "20px",
          color: "white",
          textAlign: "center",
          maxWidth: "400px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        {card.photo_url && (
          <img
            src={card.photo_url}
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: "20px",
            }}
          />
        )}

        <h2>To My Beloved</h2>
        <h1>{card.partner_name}</h1>
        <p>{card.message}</p>
      </div>
    </div>
  );
};

export default ViewCard;