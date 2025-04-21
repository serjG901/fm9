import { useState } from "react";
import {
  defaultPayment,
  Payment,
  Tag,
  TextesByLanguage,
} from "../../../interfaces";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SearchedName from "../../molecul/searched-name/SearchedName";
import UpdatePayment from "../../substance/update-payment/UpdatePayment";
import "./style.css";

interface PaymentCardSimpleComponent extends TextesByLanguage {
  maybeName?: string[];
  payment?: Payment;
  fromOptions?: string[];
  forOptions?: string[];
  updatePayment?: (payment: Payment) => void;
  deletePayment?: (payment: Payment) => void;
  maybeTags?: Tag[];
  search?: string;
  currencies?: string[];
  isSearchBySource?: boolean;
  checkDebetCurrency?: (sourceName: string) => string | undefined;
  checkCreditCurrency?: (sourceName: string) => string | undefined;
  colored?: boolean;
}

export default function PaymentCardSimple({
  textes = {},
  maybeName = [],
  payment = defaultPayment,
  fromOptions = [],
  forOptions = [],
  updatePayment = () => {},
  deletePayment = () => {},
  maybeTags = [],
  search = "",
  currencies = [],
  isSearchBySource = false,
  checkDebetCurrency = () => undefined,
  checkCreditCurrency = () => undefined,
  colored = false,
}: PaymentCardSimpleComponent) {
  const [isShow, setIsShow] = useState(false);
  const showModal = () => {
    const modalId = document.getElementById(`update-payment-${payment.id}`);
    modalId?.showPopover();
    setIsShow(true);
  };

  return (
    <button
      className='payment-card-simple'
      key={payment.id}
      onClick={showModal}
      data-colored={colored ? "colored" : ""}
    >
      <div className='payment-card-simple-datetime'>
        {payment.datetime.split("T")[1]}
      </div>
      <div className='payment-card-simple-name'>
        {isSearchBySource ? (
          payment.name
        ) : (
          <SearchedName name={payment.name} search={search} />
        )}
        <div className='overflow-bg'></div>
      </div>{" "}
      <div>
        <div className='payment-card-simple-amount'>{payment.amount}</div>
        <div className='payment-card-simple-currency'>{payment.currency}</div>
      </div>
      <div className='payment-card-simple-tags'>
        {payment.tags.map((t) => (
          <HighlightText key={t.value + t.color} bgColor={t.color} padding simple={colored}>
            {t.value}
          </HighlightText>
        ))}
        <div className='overflow-bg'></div>
      </div>
      {payment.from && payment.for && (
        <div className='payment-card-simple-from-for'>
          <div className='payment-card-simple-from'>
            {isSearchBySource ? (
              <SearchedName name={payment.from} search={search} />
            ) : (
              payment.from
            )}
          </div>
          <hr/>
          <div className='payment-card-simple-for'>
            {isSearchBySource ? (
              <SearchedName name={payment.for} search={search} />
            ) : (
              payment.for
            )}
          </div>
          <div className='overflow-bg'></div>
        </div>
      )}
      <UpdatePayment
        textes={textes}
        maybeName={maybeName}
        payment={payment}
        fromOptions={fromOptions}
        forOptions={forOptions}
        updatePayment={updatePayment}
        deletePayment={deletePayment}
        maybeTags={maybeTags}
        currencies={currencies}
        checkDebetCurrency={checkDebetCurrency}
        checkCreditCurrency={checkCreditCurrency}
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </button>
  );
}
