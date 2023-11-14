const DEFAULT_TRIGGER_SELECTOR = "data-dialog";

const timeoutIds = {};

const isOutsideDialog = (dialogElement, e) => {
  const rect = dialogElement.getBoundingClientRect();
  return (
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom
  );
};

const handleDialogClose = dialogElement => {
  const dialogId = dialogElement.getAttribute("id");
  if (!timeoutIds[dialogId]) {
    dialogElement.classList.remove("visible");
    timeoutIds[dialogId] = window.setTimeout(() => {
      dialogElement.close();
      delete timeoutIds[dialogId];
    }, 300);
  }
};

const handleDialogClick = (dialogElement, e) => {
  if (isOutsideDialog(dialogElement, e)) {
    handleDialogClose(dialogElement);
  }
};

const bindDialogEvents = dialogElement => {
  dialogElement.addEventListener("click", e => handleDialogClick(dialogElement, e));
  dialogElement.querySelectorAll("[data-dialog-close]").forEach(el => {
    el.addEventListener("click", () => handleDialogClose(dialogElement));
  });
};

const createCloseButton = dialogElement => {
  const closeBtn = document.createElement("a");
  closeBtn.classList.add("close");
  closeBtn.setAttribute("aria-label", "Close dialog");
  closeBtn.setAttribute("title", "Close dialog");
  closeBtn.setAttribute("type", "button");
  closeBtn.setAttribute("data-dialog-close", "");
  dialogElement.appendChild(closeBtn);
};

const handleTriggerClick = e => {
  console.log("handleTriggerClick");
  const dialogElement = document.getElementById(e.target.dataset.dialog);
  dialogElement.showModal();
  dialogElement.classList.add("visible");
};

const bindTriggerEvents = trigger => trigger.addEventListener("click", handleTriggerClick);

const getDialogTriggers = () => document.querySelectorAll(`[${DEFAULT_TRIGGER_SELECTOR}]`);

const processTrigger = trigger => {
  bindTriggerEvents(trigger);
  const dialogElement = document.getElementById(trigger.dataset.dialog);
  if (dialogElement) {
    createCloseButton(dialogElement);
    bindDialogEvents(dialogElement);
  }
};

const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => {
        if (node.hasAttribute(DEFAULT_TRIGGER_SELECTOR)) {
          bindTriggerEvents(node);
          processTrigger(node);
        }

        node.querySelectorAll(`[${DEFAULT_TRIGGER_SELECTOR}]`).forEach(processTrigger);
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  getDialogTriggers().forEach(processTrigger);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    const openedDialog = document.querySelector("dialog.visible");
    if (openedDialog) {
      e.preventDefault();
      handleDialogClose(openedDialog);
    }
  }
});
