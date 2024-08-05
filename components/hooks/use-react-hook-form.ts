import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import * as yup from 'yup';

type SchemaData<T> = {
  [K in keyof T]: yup.Schema<any>;
};

type HookOptions<T> = {
  schema: yup.ObjectSchema<SchemaData<T>> | any;
};

const useReactHookForm = <T>({ schema }: HookOptions<T>) => {
  const t = useIntl();
  const [loading, setLoading] = useState(false);
  const [hasSuccess, setHasSuccess] = useState<boolean | string | undefined>(
    undefined,
  );
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined,
  );
  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return {
    t,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    isDirty,
    isValid,
    register,
    isSubmitting,
    hasSuccess,
    setHasSuccess,
    setHasErrors,
  };
};

export { useReactHookForm };
