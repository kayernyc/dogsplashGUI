import  { IncomingMessage, ServerResponse } from 'http';
import DataModel from '../dataModel';

const json = [
  {
    'id': 'LBI7cgq3pbM',
    'created_at': '2016-05-03T11:00:28-04:00',
    'updated_at': '2016-07-10T11:00:01-05:00',
    'width': 5245,
    'height': 3497,
    'color': '#60544D',
    'likes': 12,
    'liked_by_user': false,
    'description': 'A man drinking a coffee.',
    'user': {
      'id': 'pXhwzz1JtQU',
      'username': 'poorkane',
      'name': 'Gilbert Kane',
      'portfolio_url': 'https://theylooklikeeggsorsomething.com/',
      'bio': 'XO',
      'location': 'Way out there',
      'total_likes': 5,
      'total_photos': 74,
      'total_collections': 52,
      'instagram_username': 'instantgrammer',
      'twitter_username': 'crew',
      'profile_image': {
        'small': 'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=32&w=32',
        'medium': 'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=64&w=64',
        'large': 'https://images.unsplash.com/face-springmorning.jpg?q=80&fm=jpg&crop=faces&fit=crop&h=128&w=128'
      },
      'links': {
        'self': 'https://api.unsplash.com/users/poorkane',
        'html': 'https://unsplash.com/poorkane',
        'photos': 'https://api.unsplash.com/users/poorkane/photos',
        'likes': 'https://api.unsplash.com/users/poorkane/likes',
        'portfolio': 'https://api.unsplash.com/users/poorkane/portfolio'
      }
    },
    'urls': {
      'raw': 'https://images.unsplash.com/face-springmorning.jpg',
      'full': 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg',
      'regular': 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=1080&fit=max',
      'small': 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=400&fit=max',
      'thumb': 'https://images.unsplash.com/face-springmorning.jpg?q=75&fm=jpg&w=200&fit=max'
    },
    'links': {
      'self': 'https://api.unsplash.com/photos/LBI7cgq3pbM',
      'html': 'https://unsplash.com/photos/LBI7cgq3pbM',
      'download': 'https://unsplash.com/photos/LBI7cgq3pbM/download',
      'download_location': 'https://api.unsplash.com/photos/LBI7cgq3pbM/download'
    }
  }
];

export const handleRequest = function(req: IncomingMessage, res: ServerResponse, data: any) {
  const { headers, method, url }  = req;
  console.log(`what is my data : ${data}`);
  // const body = JSON.stringify(json);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  const responseBody = {headers, method, url, data};

  res.write(JSON.stringify(responseBody));
  res.end();
  return;
};
