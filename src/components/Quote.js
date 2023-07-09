import React from 'react';
import Card from 'react-bootstrap/Card';
import '../bootstrap/bootstrap.min.css';

const Quote = ({quote, author}) => {
  console.log('render ', author);
  return (
      <Card className="m-auto mt-3" border="info">
        <Card.Body>
          <Card.Text className="mb-2" style={{textIndent: '2rem'}}>
            {quote}
          </Card.Text>
          <Card.Text className="fst-italic text-end">
            {author}
          </Card.Text>
        </Card.Body>
      </Card>
  );
}

export default React.memo(Quote);