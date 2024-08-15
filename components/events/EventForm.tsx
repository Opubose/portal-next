import { ActiveEventResult } from 'lib/types/event';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import DateTimePickerWrapper from './DateTimePickerWrapper';

interface EventFormProps {
  event?: ActiveEventResult;
  formAction: 'Edit' | 'Create';
  onGoBack: () => void;
  onDeleteEvent?: () => Promise<void>;
  submitActionName: string;
  onFormSubmit: (form: ActiveEventResult) => Promise<void>;
  eventCategories: Array<{ id: string; eventCategoryName: string }>;
}

export default function EventForm({
  formAction,
  onGoBack,
  onDeleteEvent,
  event,
  onFormSubmit,
  eventCategories,
  submitActionName,
}: EventFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ActiveEventResult>({
    mode: 'onChange',
    defaultValues: {
      start: event?.start || new Date().toISOString(),
      end: event?.end || new Date().toISOString(),
      description: event?.description || '',
      location: event?.location || '',
      summary: event?.summary || '',
      url: event?.url || '',
      id: event?.id || '',
      isPublic: event?.isPublic || true,
      category: {
        id: event?.category?.id || '',
      },
    },
  });
  const watchStartDate = watch('start', new Date().toISOString());
  return (
    <div className="p-3">
      {/* Form Label */}
      <div className="w-full grid place-items-center">
        <div className="mx-auto my-3">
          <h1 className="text-3xl font-semibold text-gray-100">
            {formAction.toLocaleLowerCase()} event
          </h1>
        </div>
      </div>

      {/* Form */}
      <form
        className="flex flex-col gap-y-3"
        onSubmit={handleSubmit(async (vals) => {
          await onFormSubmit(vals as any);
          onGoBack();
        })}
      >
        {/* NEW STYLE TODO: */}
        <div className="flex flex-wrap -mx-3 mb-6 w-[60%]">
          <div className="w-full px-3 my-3">
            <div className="md:w-1/3"></div>
            <label className="md:w-2/3 block text-gray-500 font-bold">
              <input className="mr-2 leading-tight" type="checkbox" {...register('isPublic')} />
              <span className="text-md">Is this event public?</span>
            </label>
          </div>
          <div className="w-full px-3">
            <label className="block text-gray-200 font-semibold mb-2">name of event*</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
              type="text"
              {...register('summary', {
                required: 'Enter event title.',
              })}
            />
            <div className="text-xs text-red-600">{errors.summary && errors.summary.message}</div>
          </div>

          <div className="w-full px-3">
            <label className="block text-gray-200 font-semibold mb-2">description*</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
              type="text"
              {...register('description', {
                required: 'Enter event description.',
              })}
            />
            <div className="text-xs text-red-600">
              {errors.description && errors.description.message}
            </div>
          </div>

          <div className="w-full px-3">
            <label className="block text-gray-200 font-semibold mb-2">location of event*</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
              type="text"
              {...register('location', {
                required: 'Enter event location.',
              })}
            />
            <div className="text-xs text-red-600">
              {errors.description && errors.description.message}
            </div>
          </div>
          <div className="w-full px-3">
            <label className="block text-gray-200 font-semibold mb-2">resource url</label>
            <input
              className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
              type="text"
              {...register('url')}
            />
          </div>
          <div className="w-full px-3">
            <label className="block text-gray-200 font-semibold mb-2">event category*</label>
            <select
              className="appearance-none block w-full text-gray-100 rounded py-3 px-4 mb-3 leading-tight focus:outline-none bg-transparent border border-gray-600"
              {...register('category.id', {
                required: 'Event category required',
              })}
            >
              {eventCategories.map((category) => (
                <option value={category.id}>{category.eventCategoryName}</option>
              ))}
            </select>
            <div className="text-xs text-red-600">
              {errors.description && errors.description.message}
            </div>
          </div>
          <div className="mt-4">
            <DateTimePickerWrapper
              register={register}
              setValue={setValue}
              name="start"
              label="Event Start Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    label: { color: 'white' },
                    svg: { color: '#fff' },
                    input: { color: '#fff', border: '#fff' },
                  }}
                />
              )}
            />
            <div className="text-xs text-red-600">{errors.start && errors.start.message}</div>
            <DateTimePickerWrapper
              register={register}
              setValue={setValue}
              name="end"
              label="Event End Date"
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    label: { color: '#fff' },
                    svg: { color: '#fff' },
                    input: { color: '#fff' },
                  }}
                />
              )}
              minDate={watchStartDate}
            />
          </div>

          <div className="text-xs text-red-600">{errors.end && errors.end.message}</div>
        </div>
        <div className="flex gap-x-3">
          <button
            className="p-3 rounded-lg bg-green-400 font-semibold hover:bg-green-500"
            disabled={isSubmitting}
            type="submit"
          >
            {submitActionName}
          </button>
          <button
            className="p-3 rounded-lg bg-gray-200 font-semibold hover:bg-gray-400"
            onClick={() => onGoBack()}
          >
            Go back
          </button>
          {onDeleteEvent && (
            <button
              className="rounded-lg bg-red-400 font-semibold p-3 hover:bg-red-500"
              onClick={async () => {
                try {
                  await onDeleteEvent();
                  alert('Event deleted');
                  onGoBack();
                } catch (error) {
                  alert('Unexpected error! Please try again later');
                  console.error(error);
                }
              }}
            >
              delete event
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
