# SAW for Alerts

## Simple Autonomous Web Components for Alerts

This repository contains a prototype library for web components designed to provide customizable alerts that can be easily integrated into software applications.


### But why?

Instead of repeatedly programming certain components from scratch within a software, it is advisable to use web components that can be integrated independently of frameworks and can be centrally managed.


### How to Initialize

To begin development, you'll need a live server environment. If you're using Visual Studio Code with the Live Server plugin, simply right-click on the `index.htm` file and select "Open with Live Server".


### How to Use

To incorporate the alert components into your project, follow these steps:

1. Place the `webcomponents` folder into the directory of the component that will utilize these web components.
2. Include the `components.js` file into your component.
   f.e. in the template via `<script src="webcomponents/components.js" defer></script>`
4. Utilize different components in your template:

- `<multi-language-component>`: Choose between German, Spanish and English (Work in Progress).
  
   ![grafik](https://github.com/cbauerdev/saw-for-alerts/assets/100590565/8673457c-e87c-4554-9a05-e31672e5ce75)

- `<alert-danger>`: Display a simple alert message for error notifications.
  
   ![grafik](https://github.com/cbauerdev/saw-for-alerts/assets/100590565/e6dfafbe-b4b6-4683-86b2-904e84718939)

- `<alert-success>`: Display a simple success message.
  
   ![grafik](https://github.com/cbauerdev/saw-for-alerts/assets/100590565/8aee379f-c2a3-469f-87c1-7c55b573a758)


### Customise your Alerts in the JSON files

**id**: The element for the template, for example, `alert danger` becomes `<alert-danger>`.

**text**: The alert text.

**description**: A reminder of what this alert signifies.

**image**: Link custom images.

**style**: Import styles from the stylesheet.

**template**: Define the template to be used.

![grafik](https://github.com/cbauerdev/saw-for-alerts/assets/100590565/d72e62ca-14ce-4d85-a9e4-9d1d6fa17888)



### Now what?

Feel free to edit the template and CSS to match your preferences, but avoid altering CSS classes or the code might fail to function properly.

Please note that this is an early prototype, hastily put together during a slow morning.

---

Feel free to expand upon this README as the project progresses, and don't hesitate to contribute or provide feedback!
