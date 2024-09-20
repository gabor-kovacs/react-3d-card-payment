import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import findCardType from "credit-card-type";
import { useEffect, useState } from "react";
import CreditCardInput from "react-credit-card-input";
import CreditCard from "./creditCard/creditCard";
import { creditCardType } from "./creditCard/lib";

function App() {
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [showBack, setShowBack] = useState(false);
  const [cardType, setCardtype] = useState<creditCardType>(undefined);

  const handleNameChange = (e: any) => {
    const { value } = e.target;
    const formattedValue = value.replace(/[^A-Za-z ]/g, "").slice(0, 28);
    setFullName(formattedValue);
  };
  const handleCardNumberChange = (e: any) => {
    setCardNumber(e.target.value);
  };
  const handleCardExpiryChange = (e: any) => {
    setExpiry(e.target.value);
  };
  const handleCardCVCChange = (e: any) => {
    setCvc(e.target.value);
  };

  useEffect(() => {
    if (findCardType(cardNumber).length === 1) {
      setCardtype(undefined);
      findCardType(cardNumber)[0].type === "visa" && setCardtype("visa");
      findCardType(cardNumber)[0].type === "american-express" &&
        setCardtype("amex");
      findCardType(cardNumber)[0].type === "mastercard" &&
        setCardtype("mastercard");
    } else {
      setCardtype(undefined);
    }
  }, [cardNumber]);

  return (
    <Outer>
      <Wrapper>
        <CanvasWrapper>
          <Canvas
            dpr={[1, 2]}
            shadows
            camera={{ position: [0, 0, 70], near: 30, far: 500 }}
          >
            <ambientLight intensity={0.7} />
            <Environment preset="lobby" resolution={1024} near={30} far={500} />
            <CreditCard
              name={fullName}
              cardNumber={cardNumber}
              expiry={expiry}
              cvc={cvc}
              showBack={showBack}
              cardType={cardType}
            />
          </Canvas>
        </CanvasWrapper>
        <Input>
          <NameInput
            type="text"
            value={fullName}
            onChange={handleNameChange}
            placeholder="Name"
          />
          <CreditCardInput
            cardNumberInputProps={{
              value: cardNumber,
              onChange: handleCardNumberChange,
            }}
            cardExpiryInputProps={{
              value: expiry,
              onChange: handleCardExpiryChange,
            }}
            cardCVCInputProps={{
              value: cvc,
              onChange: handleCardCVCChange,
              onFocus: () => {
                setShowBack(true);
              },
              onBlur: () => {
                setShowBack(false);
              },
            }}
            containerStyle={{
              width: "100%",
              marginBottom: "28px",
            }}
            fieldStyle={{
              backgroundColor: "#fff0",
              border: "1px solid #ddd",
              borderRadius: "3px",
            }}
          />
          <Button variant="contained">buy now</Button>
        </Input>
      </Wrapper>
    </Outer>
  );
}

export default App;

const Outer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 390px;
  border-radius: 50px;
  background: #ffffff;
  box-shadow: 2.2px 2.8px 2.2px rgba(0, 0, 0, 0.017),
    5.3px 6.7px 5.4px rgba(0, 0, 0, 0.024),
    9.9px 12.5px 10.1px rgba(0, 0, 0, 0.03),
    17.6px 22.3px 18.1px rgba(0, 0, 0, 0.036),
    33px 41.8px 33.8px rgba(0, 0, 0, 0.043), 79px 100px 81px rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 560px) {
    width: calc(100% - 16px);
    margin: 8px;
  }
`;

const CanvasWrapper = styled.div`
  position: absolute;
  top: -60%;
  width: 100%;
  height: 120%;
  @media screen and (max-width: 560px) {
    top: -55%;
  }
  @media screen and (max-width: 400px) {
    top: -50%;
  }
`;
const Input = styled.div`
  position: relative;
  top: 45%;
  width: calc(100% - 64px);
  margin: 0 auto;

  @media screen and (max-width: 560px) {
    width: calc(100% - 32px);
  }
`;

const NameInput = styled.input`
  background-color: #fff0;
  position: relative;
  width: 100%;
  padding: 10px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 28px;
`;
