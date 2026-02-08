// ...existing code...
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const ViewCard = ({ shareCode }: { shareCode?: string }) => {
  const [card, setCard] = useState<any>(null);

  useEffect(() => {
    if (!shareCode) return;

    const fetchCard = async () => {
      const { data, error } = await supabase
        .from("love_cards")
        .select("*")
        .eq("share_code", shareCode)
        .single();

      if (!error) setCard(data);
    };

    fetchCard();
  }, [shareCode]);

  if (!shareCode)
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        No share code provided.
      </div>
    );

  if (!card)
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        Loading love ❤️...
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