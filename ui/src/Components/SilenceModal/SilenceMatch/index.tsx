import React, { FC } from "react";

import { observer } from "mobx-react-lite";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import { SilenceFormStore, MatcherWithIDT } from "Stores/SilenceFormStore";
import { TooltipWrapper } from "Components/TooltipWrapper";
import { LabelNameInput } from "./LabelNameInput";
import { LabelValueInput } from "./LabelValueInput";

const SilenceMatch: FC<{
  silenceFormStore: SilenceFormStore;
  matcher: MatcherWithIDT;
  showDelete: boolean;
  onDelete: () => void;
  isValid: boolean;
}> = ({ silenceFormStore, matcher, showDelete, onDelete, isValid }) => {
  return (
    <div className="d-flex flex-fill flex-lg-row flex-column mb-3">
      <div className="flex-shrink-0 flex-grow-0 flex-basis-25 pr-lg-2 pb-2 pb-lg-0">
        <LabelNameInput matcher={matcher} isValid={isValid} />
      </div>
      <div className="flex-shrink-0 flex-grow-0 flex-basis-50 pr-lg-2 pb-2 pb-lg-0">
        <LabelValueInput
          silenceFormStore={silenceFormStore}
          matcher={matcher}
          isValid={isValid}
        />
      </div>
      <div className="flex-shrink-0 flex-grow-1 flex-basis-auto form-check form-check-inline d-flex justify-content-between m-0">
        <span className="custom-control custom-switch">
          <input
            id={`isRegex-${matcher.id}`}
            className="custom-control-input"
            type="checkbox"
            value=""
            checked={matcher.isRegex}
            onChange={(event) => {
              if (matcher.values.length <= 1) {
                matcher.isRegex = event.target.checked;
              }
            }}
            disabled={matcher.values.length > 1}
          />
          <label
            className="custom-control-label cursor-pointer mr-3"
            htmlFor={`isRegex-${matcher.id}`}
          >
            Regex
          </label>
        </span>
        {showDelete ? (
          <TooltipWrapper title="Remove this matcher">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={onDelete}
            >
              <FontAwesomeIcon icon={faTrash} fixedWidth />
            </button>
          </TooltipWrapper>
        ) : null}
      </div>
    </div>
  );
};

export default observer(SilenceMatch);
