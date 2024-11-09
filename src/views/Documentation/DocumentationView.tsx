import DocumentComponent from "../../components/documentation/DocumentComponent.tsx";
import TButton from "../../components/generic/Button/TButton.tsx";
import Loading from "../../components/generic/Loading.tsx";
import styles from "./docView.module.scss";
import Modal from "../../components/generic/Modal/Modal.tsx";
import FormattedTimeDisplay from "../../components/generic/FormattedTimeDisplay.tsx";
import Icon from "../../components/Icons/Icon.tsx";
import GenericListMenu from "../../components/menus/ListMenu/ListMenu.tsx";
import TabMenu from "../../components/menus/TabMenu/TabMenu.tsx";
import Countdown from "../../components/timers/Countdown/Countdown.tsx";
import StopWatch from "../../components/timers/Stopwatch/Stopwatch.tsx";
import Tabata from "../../components/timers/Tabata/Tabata.tsx";
import XY from "../../components/timers/XY/XY.tsx";
import Logotype from "../../components/Graphics/Branding/Logotype/Logotype.tsx";



/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (

      <div className={styles.mainDocView}>
        <h2>Documentation</h2>
          <div className={styles.branding}>
              <Logotype />
              <p>
                  Tempomo - The name I came up with for this product is a combination of Tempo and Momentum. A fun brand that has a name that's fun to say.
              </p>
          </div>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading size="medium" color="#ffa2bf" />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
          <DocumentComponent
              title="TButton"
              component={
                  <TButton
                      btnType="round-large"
                      flair="shimmer"
                      hoverAni="grow"
                      actionFunc={() => console.log("Button clicked")}
                      label="Click Me"
                      icon="xy"
                  />
              }
              propDocs={[
                  {
                      prop: "btnType",
                      description: "Defines the button's style and shape. Options are 'round-large', 'round-small', 'small-rect', and 'med-rect'.",
                      type: "string",
                      defaultValue: "round-large"
                  },
                  {
                      prop: "flair",
                      description: "Applies a visual flair to the button, like an animation or special effect. Currently supported: 'shimmer'.",
                      type: "string",
                      defaultValue: "none"
                  },
                  {
                      prop: "hoverAni",
                      description: "Adds a hover animation effect to the button. Currently supported: 'grow'.",
                      type: "string",
                      defaultValue: "none"
                  },
                  {
                      prop: "actionFunc",
                      description: "Function executed when the button is clicked.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "label",
                      description: "The text label displayed inside the button.",
                      type: "string",
                      defaultValue: "none"
                  },
                  {
                      prop: "icon",
                      description: "Specifies an icon to display within the button. Accepts an `iconGraphic` type value.",
                      type: "iconGraphic",
                      defaultValue: "none"
                  },
                  {
                      prop: "classes",
                      description: "Custom class names to style the button.",
                      type: "string",
                      defaultValue: "none"
                  }
              ]}
          />

          <DocumentComponent
              title="Modal"
              component={
                  <Modal
                  classes={styles.modal}
                      title="Example Modal"
                      hasCloseBtn={true}
                      closeFunc={() => console.log("Modal closed")}
                  >
                      <p>This is a sample modal content.</p>
                  </Modal>
              }
              propDocs={[
                  {
                      prop: "children",
                      description: "Content to be displayed inside the modal. Can include any valid React nodes.",
                      type: "React.ReactNode",
                      defaultValue: "none"
                  },
                  {
                      prop: "hasCloseBtn",
                      description: "Determines if a close button is shown in the modal's title bar.",
                      type: "boolean",
                      defaultValue: "false"
                  },
                  {
                      prop: "closeFunc",
                      description: "Function called when the close button is clicked, if `hasCloseBtn` is true.",
                      type: "function",
                      defaultValue: "none"
                  },
                  {
                      prop: "title",
                      description: "Optional title text displayed in the modal header.",
                      type: "string",
                      defaultValue: "none"
                  }
              ]}
          />

          <DocumentComponent
              title="FormattedTimeDisplay"
              component={<FormattedTimeDisplay milliseconds={3605000} classes={styles.timer} />}
              propDocs={[
                  {
                      prop: "milliseconds",
                      description: "The time in milliseconds to be formatted and displayed. The component will format the time into hours, minutes, seconds, and hundredths as needed.",
                      type: "number",
                      defaultValue: "0"
                  }
              ]}
          />

          <DocumentComponent
              title="Icon"
              component={<Icon iconName="stopwatch" />}
              propDocs={[
                  {
                      prop: "iconName",
                      description: "Specifies the icon to display. Options include 'countdown', 'stopwatch', 'xy', 'tabata', 'menu', 'timers', 'checkmark', 'documentation', 'close-x', and 'plus'.",
                      type: "iconGraphic",
                      defaultValue: "none"
                  },
                  {
                      prop: "classes",
                      description: "Optional custom CSS class names for additional styling.",
                      type: "string",
                      defaultValue: "none"
                  }
              ]}
          />

          <DocumentComponent
              title="GenericListMenu"
              component={
                  <GenericListMenu
                      menuItems={[
                          { label: "Home", link: "/", iconName: "menu" },
                          { label: "Stopwatch", link: "/stopwatch", iconName: "stopwatch" },
                          { label: "Countdown", link: "/countdown", iconName: "countdown" },
                      ]}
                  />
              }
              propDocs={[
                  {
                      prop: "menuItems",
                      description: "An array of menu item objects, each with a label, link, and optional icon name.",
                      type: "MenuItem[]",
                      defaultValue: "[]"
                  },
                  {
                      prop: "classes",
                      description: "Optional custom CSS class names for additional styling of the list container.",
                      type: "string",
                      defaultValue: "none"
                  }
              ]}
          />

          <DocumentComponent
              title="TabMenu"
              component={
                  <TabMenu
                      items={[
                          {
                              label: "Home",
                              iconName: "menu",
                              onClick: () => console.log("Home clicked"),
                          },
                          {
                              label: "Stopwatch",
                              iconName: "stopwatch",
                              onClick: () => console.log("Stopwatch clicked"),
                          },
                          {
                              label: "Countdown",
                              iconName: "countdown",
                              onClick: () => console.log("Countdown clicked"),
                          },
                      ]}
                  />
              }
              propDocs={[
                  {
                      prop: "items",
                      description: "An array of menu items to display in the tab menu. Each item includes a label, icon, and onClick handler.",
                      type: "Array<{ label: string; iconName: iconGraphic; onClick: () => void }>",
                      defaultValue: "[]"
                  },
                  {
                      prop: "classes",
                      description: "Optional custom CSS class names for additional styling of the tab menu container.",
                      type: "string",
                      defaultValue: "none"
                  }
              ]}
          />
          <DocumentComponent
              title="Countdown Timer"
              component={
                  <Countdown
                      milliseconds={0}
                      isRunning={false}
                      initialTime={60000}
                      reset={() => console.log("Reset Countdown")}
                      pause={() => console.log("Pause Countdown")}
                      start={() => console.log("Start Countdown")}
                      classes={styles.timer}
                  />
              }
              propDocs={[
                  {
                      prop: "milliseconds",
                      description: "The elapsed time in milliseconds, used to calculate the remaining countdown time.",
                      type: "number",
                      defaultValue: "0"
                  },
                  {
                      prop: "isRunning",
                      description: "Indicates if the countdown timer is currently running.",
                      type: "boolean",
                      defaultValue: "false"
                  },
                  {
                      prop: "initialTime",
                      description: "The starting time for the countdown in milliseconds.",
                      type: "number",
                      defaultValue: "60000"
                  },
                  {
                      prop: "reset",
                      description: "Function to reset the countdown to its initial state.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "pause",
                      description: "Function to pause the countdown.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "start",
                      description: "Function to start or resume the countdown.",
                      type: "function",
                      defaultValue: "() => {}"
                  }
              ]}
          />

          <DocumentComponent
              title="StopWatch"
              component={
                  <StopWatch
                      milliseconds={0}
                      isRunning={false}
                      reset={() => console.log("Reset Stopwatch")}
                      pause={() => console.log("Pause Stopwatch")}
                      start={() => console.log("Start Stopwatch")}
                      classes={styles.timer}
                  />
              }
              propDocs={[
                  {
                      prop: "milliseconds",
                      description: "The elapsed time in milliseconds, used to display the current stopwatch time.",
                      type: "number",
                      defaultValue: "0"
                  },
                  {
                      prop: "isRunning",
                      description: "Indicates if the stopwatch is currently running.",
                      type: "boolean",
                      defaultValue: "false"
                  },
                  {
                      prop: "reset",
                      description: "Function to reset the stopwatch to its initial state and clear all laps.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "pause",
                      description: "Function to pause the stopwatch.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "start",
                      description: "Function to start or resume the stopwatch.",
                      type: "function",
                      defaultValue: "() => {}"
                  }
              ]}
          />
          <DocumentComponent
              title="Tabata Timer"
              component={
                  <Tabata
                      milliseconds={0}
                      isRunning={false}
                      reset={() => console.log("Reset Tabata")}
                      pause={() => console.log("Pause Tabata")}
                      start={() => console.log("Start Tabata")}
                      classes={styles.timer}
                  />
              }
              propDocs={[
                  {
                      prop: "milliseconds",
                      description: "The elapsed time in milliseconds, used to calculate the remaining time for each work or break phase.",
                      type: "number",
                      defaultValue: "0"
                  },
                  {
                      prop: "isRunning",
                      description: "Indicates if the Tabata timer is currently active.",
                      type: "boolean",
                      defaultValue: "false"
                  },
                  {
                      prop: "reset",
                      description: "Function to reset the Tabata timer to its initial configuration.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "pause",
                      description: "Function to pause the Tabata timer.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "start",
                      description: "Function to start or resume the Tabata timer.",
                      type: "function",
                      defaultValue: "() => {}"
                  }
              ]}
          />

          <DocumentComponent
              title="XY Timer"
              component={
                  <XY
                      milliseconds={0}
                      isRunning={false}
                      reset={() => console.log("Reset XY Timer")}
                      pause={() => console.log("Pause XY Timer")}
                      start={() => console.log("Start XY Timer")}
                      classes={styles.timer}
                  />
              }
              propDocs={[
                  {
                      prop: "milliseconds",
                      description: "The elapsed time in milliseconds, used to calculate the remaining time for each round.",
                      type: "number",
                      defaultValue: "0"
                  },
                  {
                      prop: "isRunning",
                      description: "Indicates if the XY timer is currently active.",
                      type: "boolean",
                      defaultValue: "false"
                  },
                  {
                      prop: "reset",
                      description: "Function to reset the XY timer to its initial configuration.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "pause",
                      description: "Function to pause the XY timer.",
                      type: "function",
                      defaultValue: "() => {}"
                  },
                  {
                      prop: "start",
                      description: "Function to start or resume the XY timer from its last position.",
                      type: "function",
                      defaultValue: "() => {}"
                  }
              ]}
          />



      </div>

  );
};

export default Documentation;
