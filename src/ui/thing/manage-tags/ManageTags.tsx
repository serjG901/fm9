import upperFirstLetter from "../../../helpers/upperFirstLetter";
import { Tag, TextesByLanguage } from "../../../interfaces";
import { useBuysStore } from "../../../store/buysStore";
import { usePaysStore } from "../../../store/paysStore";
import ActionButton from "../../atom/action-button/ActionButton";
import Collapse from "../../atom/collapse/Collapse";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";
import FlexWrap from "../../atom/flex-wrap/FlexWrap";
import FormTag from "../../molecul/form-tag/FormTag";
import Modal from "../../molecul/modal/Modal";
import "./style.css";

export default function ManageTags({ textes = {} }: TextesByLanguage) {
  const [buys, updateBuys] = useBuysStore((state) => [
    state.payments,
    state.updatePayment,
  ]);
  const [pays, updatePays] = usePaysStore((state) => [
    state.payments,
    state.updatePayment,
  ]);

  const maybeBuysTags = buys
    .flatMap((p) => p.tags)
    .reduce(
      (acc: Tag[], tag) =>
        acc.find((t) => t.value + t.color === tag.value + tag.color)
          ? acc
          : [...acc, tag],
      []
    )
    .sort((a, b) => (a.value > b.value ? 1 : -1));

  const maybePaysTags = pays
    .flatMap((p) => p.tags)
    .reduce(
      (acc: Tag[], tag) =>
        acc.find((t) => t.value + t.color === tag.value + tag.color)
          ? acc
          : [...acc, tag],
      []
    )
    .sort((a, b) => (a.value > b.value ? 1 : -1));

  const handleShowModalBuysTag = ({ value, color }: Tag) => {
    const modalId = document.getElementById(`update-tag-buy-${value + color}`);
    modalId?.showPopover();
  };

  const handleShowModalPaysTag = ({ value, color }: Tag) => {
    const modalId = document.getElementById(`update-tag-pay-${value + color}`);
    modalId?.showPopover();
  };

  const updateBuyTag = (newTag: Tag, oldTag?: Tag) => {
    if (oldTag) {
      buys.forEach((payment) => {
        const needUpdate = payment.tags.find(
          (t) => t.value + t.color === oldTag.value + oldTag.color
        );
        if (!needUpdate) return;
        const filtredTags = payment.tags.filter(
          (t) => t.value + t.color !== oldTag.value + oldTag.color
        );
        const newTags = [...filtredTags, newTag];
        const newPayment = { ...payment, tags: newTags };
        updateBuys(newPayment);
      });
      const modalId = document.getElementById(
        `update-tag-buy-${oldTag.value + oldTag.color}`
      );
      modalId?.hidePopover();
    }
  };

  const updatePayTag = (newTag: Tag, oldTag?: Tag) => {
    if (oldTag) {
      pays.forEach((payment) => {
        const needUpdate = payment.tags.find(
          (t) => t.value + t.color === oldTag.value + oldTag.color
        );
        if (!needUpdate) return;
        const filtredTags = payment.tags.filter(
          (t) => t.value + t.color !== oldTag.value + oldTag.color
        );
        const newTags = [...filtredTags, newTag];
        const newPayment = { ...payment, tags: newTags };
        updatePays(newPayment);
      });
      const modalId = document.getElementById(
        `update-tag-pay-${oldTag.value + oldTag.color}`
      );
      modalId?.hidePopover();
    }
  };

  return (
    <FlexColumnCenter>
      <Collapse
        title={textes["buys"] ? upperFirstLetter(textes["buys"]) : "Buys"}
        collapseLevel='settings'
      >
        <FlexWrap>
          {maybeBuysTags.map((maybeTag) => (
            <>
              <ActionButton
                key={maybeTag.value + maybeTag.color}
                actionWithPayload={handleShowModalBuysTag}
                payload={{
                  value: maybeTag.value,
                  color: maybeTag.color,
                }}
                bgColor={maybeTag.color}
              >
                {maybeTag.value}
              </ActionButton>
              <Modal
                id={`update-tag-buy-${maybeTag.value + maybeTag.color}`}
                textes={textes}
              >
                <FormTag
                  textes={textes}
                  valueFromParent={maybeTag.value}
                  colorFromParent={maybeTag.color}
                  hoistTag={updateBuyTag}
                  typeAction='update'
                />
              </Modal>
            </>
          ))}
        </FlexWrap>
      </Collapse>
      <Collapse
        title={textes["pays"] ? upperFirstLetter(textes["pays"]) : "Pays"}
        collapseLevel='settings'
      >
        <FlexWrap>
          {maybePaysTags.map((maybeTag) => (
            <>
              <ActionButton
                key={maybeTag.value + maybeTag.color}
                actionWithPayload={handleShowModalPaysTag}
                payload={{
                  value: maybeTag.value,
                  color: maybeTag.color,
                }}
                bgColor={maybeTag.color}
              >
                {maybeTag.value}
              </ActionButton>
              <Modal
                id={`update-tag-pay-${maybeTag.value + maybeTag.color}`}
                textes={textes}
              >
                <FormTag
                  textes={textes}
                  valueFromParent={maybeTag.value}
                  colorFromParent={maybeTag.color}
                  hoistTag={updatePayTag}
                  typeAction='update'
                />
              </Modal>
            </>
          ))}
        </FlexWrap>
      </Collapse>
    </FlexColumnCenter>
  );
}