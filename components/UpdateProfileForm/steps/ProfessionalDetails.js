import React from 'react';
import { bool, number } from 'prop-types';
import { Field } from 'formik';
import * as Yup from 'yup';
import { updateUser } from 'common/constants/api';
import { validationErrorMessages } from 'common/constants/messages';
import Input from 'components/Form/Input/Input';
import Select from 'components/Form/Select/Select';
import ProgressIndicator from 'components/ProgressIndicator/ProgressIndicator';
import styles from './_steps.css';

class ProfessionalDetails extends React.Component {
  static propTypes = {
    isSubmitting: bool,
    stepNumber: number,
    totalSteps: number,
  };

  static defaultProps = {
    isSubmitting: false,
    stepNumber: 0,
    totalSteps: 0,
  };

  static validationSchema = Yup.object().shape({
    employmentStatus: Yup.string()
      .nullable()
      .required(validationErrorMessages.required),
    companyName: Yup.string().nullable(),
    companyRole: Yup.string().nullable(),
  });

  static initialValues = {
    employmentStatus: '',
    companyName: '',
    companyRole: '',
  };

  static submitHandler = async values => {
    await updateUser(values);
  };

  render() {
    const { isSubmitting, stepNumber, totalSteps } = this.props;

    return (
      <>
        <h3 className={styles.row}>Professional Details</h3>

        <ProgressIndicator stepNumber={stepNumber} totalSteps={totalSteps} />

        <div className={styles.row}>
          <Field
            className={styles.fullWidth}
            name="employmentStatus"
            label="Employment Status*"
            component={Select}
            options={[
              {
                value: 'fulltime',
                label: 'Employed Full-Time',
              },
              {
                value: 'parttime',
                label: 'Employed Part-Time',
              },
              {
                value: 'unemployed',
                label: 'Currently Unemployed',
              },
            ]}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.row}>
          <Field
            type="text"
            name="companyName"
            label="Company Name"
            component={Input}
            disabled={isSubmitting}
          />

          <Field
            type="text"
            name="companyRole"
            label="Company Role"
            component={Input}
            disabled={isSubmitting}
          />
        </div>
      </>
    );
  }
}

export default ProfessionalDetails;
