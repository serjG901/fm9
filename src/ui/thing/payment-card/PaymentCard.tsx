import { useState } from "react";
import {
  defaultPayment,
  Payment,
  Tag,
  TextesByLanguage,
} from "../../../interfaces";
import ArrowFromFor from "../../atom/arrow-from-for/ArrowFromFor";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import HighlightText from "../../atom/highlight-text/HighlightText";
import SearchedName from "../../molecul/searched-name/SearchedName";
import UpdatePayment from "../../substance/update-payment/UpdatePayment";
import "./style.css";

interface PaymentCardComponent extends TextesByLanguage {
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
  payments?: Payment[];
  autoAddTags?: boolean;
}

export default function PaymentCard({
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
  payments = [],
  autoAddTags = false,
}: PaymentCardComponent) {
  const [isShow, setIsShow] = useState(false);
  const showModal = () => {
    const modalId = document.getElementById(`update-payment-${payment.id}`);
    modalId?.showPopover();
    setIsShow(true);
  };

  return (
    <button
      className='payment-card'
      key={payment.id}
      onClick={showModal}
      data-colored={colored ? "colored" : ""}
    >
      <FlexColumnCenter>
        <div className='payment-card-datetime'>
          {payment.datetime.split("T").map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div>
          <div className='payment-card-name'>
            {isSearchBySource ? (
              payment.name
            ) : (
              <SearchedName name={payment.name} search={search} />
            )}
          </div>
          <div className='payment-card-amount'>{payment.amount}</div>
          <div className='payment-card-currency'>{payment.currency}</div>
        </div>
        <div className='payment-card-tags'>
          {payment.tags.map((t) => (
            <HighlightText
              key={t.value + t.color}
              bgColor={t.color}
              padding
              simple={colored}
            >
              {t.value}
            </HighlightText>
          ))}
        </div>
        {payment.from && payment.for && (
          <div className='payment-card-from-for'>
            <div className='payment-card-from'>
              {isSearchBySource ? (
                <SearchedName name={payment.from} search={search} />
              ) : (
                payment.from
              )}
            </div>
            <ArrowFromFor />
            <div className='payment-card-for'>
              {isSearchBySource ? (
                <SearchedName name={payment.for} search={search} />
              ) : (
                payment.for
              )}
            </div>
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
          payments={payments}
          autoAddTags={autoAddTags}
        />
      </FlexColumnCenter>
    </button>
  );
}
