import React from 'react';
import { Form, Field } from 'react-final-form';
import { MinimalButton } from './buttons/MinimalButton';

interface ContactFormValues {
  'form-name'?: string;
  name?: string;
  mail?: string;
  message?: string;
}

const onSubmit = (values: ContactFormValues) => {
  values['form-name'] = 'photoContact';

  const formData = new FormData();
  const entries = Object.keys(values) as Array<keyof ContactFormValues>;
  for (const key of entries) {
    formData.append(key, values[key] || '');
  }

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
  })
    .then(() => {
      console.log('Form successfully submitted');
      // TODO clear input, show notification success
    })
    .catch((error) => console.log(error));
};

const nameRequired = (value: string | undefined) =>
  value ? undefined : 'Please provide a name';
const mailRequired = (value: string | undefined) =>
  value ? undefined : 'Please provide a mail to reach back to you';

export const ContactForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form
          name="photoContact"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
        >
          <input name="form-name" value="photoContact" type="hidden" />
          <Field
            name="name"
            validate={nameRequired}
            render={({ input, meta }) => (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  First and Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="First and Last Name"
                  {...input}
                />
                {meta.touched && meta.error && (
                  <span className="text-red-500 text-xs italic">
                    {meta.error}
                  </span>
                )}
              </>
            )}
          />
          <Field
            name="mail"
            validate={mailRequired}
            render={({ input, meta }) => (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="mail"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email to contact you"
                  {...input}
                />
                {meta.touched && meta.error && (
                  <span className="text-red-500 text-xs italic">
                    {meta.error}
                  </span>
                )}
              </>
            )}
          />
          <Field
            name="message"
            render={({ input, meta }) => (
              <>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...input}
                />
                {meta.touched && meta.error && (
                  <span className="text-red-500 text-xs italic">
                    {meta.error}
                  </span>
                )}
              </>
            )}
          />
          <div className="flex justify-center pt-4">
            <MinimalButton onClick={form.submit} disabled={pristine}>
              Send Form
            </MinimalButton>
            <MinimalButton
              className="ml-3"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </MinimalButton>
          </div>
        </form>
      )}
    />
  );
};

export default ContactForm;
