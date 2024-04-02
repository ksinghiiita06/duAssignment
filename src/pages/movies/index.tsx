import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {POSTER_IMAGE_BASE_URL} from '../../common/apiConstants';
import EmptyListView from './components/EmptyListView';
import ErrorView from './components/ErrorView';
import LoadingView from './components/LoadingView';
import styles from './styles';
import {useAppSelector} from '../../redux';
import Header from '../commonComponents/header';
import {strings} from '../../localize';
import {movieType, useFetchMovies} from './hooks/useFetchMovies';

const NUMBER_OF_COLUMNS = 2;

const Movies = () => {
  const {language} = useAppSelector(state => state.app);
  const {
    fetching,
    fetchMovies,
    response: moviesResponse,
    error,
  } = useFetchMovies();

  useEffect(() => {
    fetchMovies(language);
  }, [fetchMovies, language]);

  const getMovieCard = ({
    item: {id, poster_path, title},
  }: {
    item: movieType;
  }): JSX.Element => {
    return (
      <View style={styles.listItem}>
        <Card mode="outlined" style={styles.cardStyle}>
          <Card.Cover
            style={styles.cardCoverStyle}
            source={{uri: `${POSTER_IMAGE_BASE_URL}${poster_path}`}}
          />
          <Card.Content>
            <Text
              testID={`title${id}`}
              variant="titleSmall"
              style={styles.textStyle}>
              {title}
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  };

  if (error) {
    return <ErrorView />;
  }
  return (
    <>
      <Header title={strings('screen2Title')} />
      {fetching ? (
        <LoadingView />
      ) : (
        <View style={styles.root}>
          <FlatList
            numColumns={NUMBER_OF_COLUMNS}
            data={moviesResponse?.results}
            keyExtractor={item => item?.id?.toString()}
            ListEmptyComponent={EmptyListView}
            showsVerticalScrollIndicator={false}
            renderItem={getMovieCard}
          />
        </View>
      )}
    </>
  );
};

export default Movies;
