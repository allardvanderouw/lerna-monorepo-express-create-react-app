import { all, call, fork, put, select, take } from 'redux-saga/effects'
import i18n from 'i18next'

import history from '../../utils/history'
import * as apiTodos from '../../services/apiTodos'
import * as actionTypes from './actionTypes'
import * as actionCreators from './actionCreators'
import { add as addNotification } from '../notifications/actionCreators'

function* fetch() {
  while (true) {
    const fetchAction = yield take(actionTypes.FETCH)
    yield put(actionCreators.fetchRequest(fetchAction.meta._id))
    try {
      const todo = yield call(apiTodos.read, fetchAction.meta._id)
      yield put(actionCreators.fetchSuccess(todo))
    } catch (error) {
      const message = (error && error.message) ? error.message : i18n.t('Todos:unknownError')
      yield put(actionCreators.fetchFailure(fetchAction.meta._id, message))
      history.push('/')
      yield put(addNotification({ message }))
    }
  }
}

function* add() {
  while (true) {
    yield take(actionTypes.ADD)
    const todo = yield select(state => state.todoState.todo)
    yield put(actionCreators.addRequest())
    try {
      const created = yield call(apiTodos.add, todo)
      yield put(actionCreators.addSuccess(created))
      history.push(`/todos/${created._id}`)
      yield put(addNotification({ message: i18n.t('Todo:added') }))
    } catch (error) {
      const message = (error && error.message) ? error.message : i18n.t('Todos:unknownError')
      yield put(actionCreators.addFailure(message))
      yield put(addNotification({ message }))
    }
  }
}

function* save() {
  while (true) {
    yield take(actionTypes.SAVE)
    const todo = yield select(state => state.todoState.todo)
    yield put(actionCreators.saveRequest())
    try {
      const saved = yield call(apiTodos.modify, todo)
      yield put(actionCreators.saveSuccess(saved))
      yield put(addNotification({ message: i18n.t('Todo:saved') }))
    } catch (error) {
      const message = (error && error.message) ? error.message : i18n.t('Todos:unknownError')
      yield put(actionCreators.saveFailure(todo._id, message))
      yield put(addNotification({ message }))
    }
  }
}

function* remove() {
  while (true) {
    yield take(actionTypes.REMOVE)
    const todo = yield select(state => state.todoState.todo)
    yield put(actionCreators.removeRequest(todo._id))
    try {
      yield call(apiTodos.remove, todo._id)
      yield put(actionCreators.removeSuccess(todo._id))
      history.push('/')
      yield put(addNotification({ message: i18n.t('Todo:removed') }))
    } catch (error) {
      const message = (error && error.message) ? error.message : i18n.t('Todos:unknownError')
      yield put(actionCreators.removeFailure(todo._id, message))
      yield put(addNotification({ message }))
    }
  }
}

export default function* rootSaga() {
  yield all([
    fetch,
    add,
    save,
    remove,
  ].map(saga => fork(saga)))
}
