import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Comment } from '@mui/icons-material'
import { Button, Card, CardActionArea, CardActions, CardContent } from '@mui/material';
import { getStuff } from './Prisma'; 
import { getDBData, addData, deleteData } from '../api/DbAPI'

// import CommentIcon from '@mui/icons-material/Comment';

export default function CheckboxList() {
  const [checked, setChecked] = useState([0]);
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const asyncCall = async () => {
      setData(await getDBData())
      setIsLoading(false)
    }
    asyncCall()
  }, [])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    console.log('actual value', value)
    console.log('dat value', newChecked)
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  console.log(data.messages)
  return (
    isLoading ? <></> :
    <Card sx={{ inlineSize: 'fit-content' }}>
      <CardContent>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {data?.messages.map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <Comment />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.name}: ${value.message}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
      <CardActions>
        <Button onClick={async () => {
          await addData({name: `Message ${data.messages.length}`, message: 'dat message'})
          setData(await getDBData())
        }
        }>Add Item</Button>
        <Button onClick={async () => {
          await deleteData(data.messages[data.messages.length-1].id)
          setData(await getDBData())
        }}>Subtract Item</Button>
      </CardActions>
    </Card>
  );
}

export {
  CheckboxList
}
