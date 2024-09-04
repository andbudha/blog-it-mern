import { useMemo } from 'react';

export const joditConfig = () => {
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: '',
      minHeight: '300',
      fontSize: '1rem',
      fontWeight: '800',
      buttons: [
        'source',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'ul',
        'ol',
        '|',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        '|',
        'table',
        'link',
        '|',
        'left',
        'center',
        'right',
        'justify',
        '|',
        'undo',
        'redo',
        '|',
        'hr',
        'eraser',
        'fullsize',
      ],
    }),
    []
  );
  return { config };
};
